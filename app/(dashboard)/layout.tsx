import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectInfoDialog } from "@/components/project-info-dialog"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col container mx-auto">
      <header className="border-b px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">漢</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ProjectInfoDialog />
        </div>
      </header>
      <main className="flex-1 p-4 overflow-auto">
        {children}
      </main>
    </div>
  )
}