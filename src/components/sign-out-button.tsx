import { doSignOut } from "@/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton({ label }: { label: string }) {
  return (
    <form action={doSignOut}>
      <Button type="submit" variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
        <LogOut className="h-4 w-4" />
        {label}
      </Button>
    </form>
  );
}
