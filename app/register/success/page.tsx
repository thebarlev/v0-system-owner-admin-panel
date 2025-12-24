import { NeumorphicCard } from "@/components/registration/neumorphic-card"
import { NeumorphicButton } from "@/components/registration/neumorphic-button"
import { CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-[480px]">
        <NeumorphicCard className="text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">ההרשמה הושלמה בהצלחה</h1>
              <p className="mt-2 text-sm text-muted-foreground">החשבון העסקי שלך נוצר</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-muted/30 border border-border/50 p-4">
            <div className="flex items-start gap-3 text-right">
              <Mail className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">בדוק את האימייל שלך</p>
                <p className="text-sm text-muted-foreground">
                  שלחנו לך מייל אימות. לחץ על הקישור כדי לאשר את החשבון לפני ההתחברות.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link href="/login">
              <NeumorphicButton className="w-full">מעבר להתחברות</NeumorphicButton>
            </Link>
            <Link href="/">
              <NeumorphicButton variant="secondary" className="w-full">
                חזרה לדף הבית
              </NeumorphicButton>
            </Link>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
