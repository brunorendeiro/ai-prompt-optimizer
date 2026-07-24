import { verifySession } from "@/lib/dal";
import { SignOutButton } from "@/components/sign-out-button";
import { Optimizer } from "@/components/optimizer";

export default async function AppPage() {
  const session = await verifySession();

  return (
    <>
      <header className="flex items-center justify-between border-b px-4 py-3">
        <a href="/" className="text-sm font-medium">
          AI Prompt Optimizer
        </a>
        <div className="flex items-center gap-3">
          <a href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </a>
          <span className="hidden text-sm text-muted-foreground sm:inline">{session?.user?.email}</span>
          <SignOutButton />
        </div>
      </header>

      <main className="flex-1">
        <Optimizer />
      </main>

      <footer className="flex flex-col items-center gap-1 border-t px-4 py-6 text-sm text-muted-foreground">
        <a href="https://vibe-portfolio-one.vercel.app/">Created by Bruno Rendeiro</a>
        <span>⚡ Powered by AI</span>
      </footer>
    </>
  );
}
