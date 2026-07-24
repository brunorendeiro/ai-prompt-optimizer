import { listLogins } from "@/lib/kv";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const logins = await listLogins(200);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <h1 className="font-heading text-3xl tracking-tight">Sign-in log</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4" />
            Recent sign-ins ({logins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logins.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sign-ins recorded yet.</p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {logins.map((login, i) => (
                <li key={i} className="flex items-center justify-between py-2">
                  <span>{login.email}</span>
                  <span className="text-muted-foreground">
                    {new Date(login.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
