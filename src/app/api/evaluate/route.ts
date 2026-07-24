import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { verifySession } from "@/lib/dal";
import { evaluateRequestSchema } from "@/lib/schema";
import { evaluateResponse, getKeyBudget } from "@/lib/openrouter";

export async function POST(request: Request) {
  const session = await verifySession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = evaluateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join("; ") },
      { status: 400 },
    );
  }

  const start = Date.now();
  try {
    const { result, usage } = await evaluateResponse(parsed.data.prompt, parsed.data.response, parsed.data.model);
    const elapsedMs = Date.now() - start;
    const budget = await getKeyBudget();

    return NextResponse.json({
      result,
      usage: {
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        totalTokens: usage.totalTokens,
        costUsd: usage.costUsd,
      },
      elapsedMs,
      budget,
    });
  } catch (err) {
    const message = err instanceof ZodError
      ? "The model's response didn't match the expected format. Try again."
      : err instanceof Error
        ? err.message
        : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
