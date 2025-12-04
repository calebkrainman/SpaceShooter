import { GameFrame } from "@/components/game-frame"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full border-b border-border/50 backdrop-blur-sm bg-card/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎮</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Game Portal</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Play
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Leaderboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <GameFrame />
      </main>

      <footer className="w-full border-t border-border/50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Built with <span className="text-accent">♥</span> and GDevelop
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Controls
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Share
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
