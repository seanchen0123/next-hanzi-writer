import { ThemeToggle } from '@/components/theme-toggle'
import { ProjectInfoDialog } from '@/components/project-info-dialog'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full container mx-auto">
      <header className="border-b px-4 h-[50px] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">漢</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ProjectInfoDialog />
        </div>
      </header>
      <main className="p-4 overflow-auto" style={{ height: 'calc(100% - 50px)' }}>
        {children}
      </main>
    </div>
  )
}
