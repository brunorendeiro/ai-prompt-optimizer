import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <Sparkles className="h-6 w-6 text-primary" />
        AI Prompt Optimizer
      </div>
      <p className="max-w-sm text-sm text-muted-foreground">
        This app is private. Sign in with the Google account that was granted access.
      </p>
      {error === "AccessDenied" && (
        <p className="max-w-sm rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          That Google account isn&apos;t authorized to use this app.
        </p>
      )}
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <Button type="submit" size="lg">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
