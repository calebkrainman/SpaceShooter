"use client";

import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, RotateCcw } from "lucide-react";
import { useState } from "react";

export function GameFrame() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // key is used to force the iframe to remount (reset the game)
  const [key, setKey] = useState(0);

  const toggleFullscreen = () => {
    // In a real application, you might also want to use the Fullscreen API here
    // document.documentElement.requestFullscreen()
    setIsFullscreen(!isFullscreen);
  };

  const resetGame = () => {
    // Incrementing the key forces the iframe element to unmount and remount,
    // effectively reloading/resetting the game.
    setKey((prev) => prev + 1);
  };

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background p-4 md:p-8"
          : "max-w-6xl mx-auto"
      }`}
      // Added mx-auto for better centering in non-fullscreen mode
    >
      <div className="flex flex-col gap-4 h-full">
        {/* Game Title & Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-bold text-balance text-foreground mb-1">
              {"Caleb's GDevelop Game"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Use arrow keys to move • Space to Shoot
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={resetGame}
              className="h-10 w-10 rounded-lg hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className="h-10 w-10 rounded-lg hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Game Container: Now contains the iframe */}
        <div className="relative flex-1 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary bg-card">
          {/* Decorative corner accents (unchanged) */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-secondary rounded-tl-xl z-10" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-secondary rounded-tr-xl z-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-secondary rounded-bl-xl z-10" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-secondary rounded-br-xl z-10" />

          {/* 🎮 Live Game iframe */}
          <iframe
            key={key} // **Crucial for the resetGame function to work**
            src="https://calebkrainman.github.io/my-gdevelop-game/" // **Your specified URL**
            title="Caleb's GDevelop Game"
            allowFullScreen // Allows the iframe content to go truly fullscreen
            frameBorder="0"
            className="w-full h-full min-h-[400px] md:min-h-[600px]" // Ensures it fills the container
          />
        </div>

        {/* Stats/Info Bar (unchanged) */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-xs text-muted-foreground mt-1">High Score</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl font-bold text-secondary">0</div>
            <div className="text-xs text-muted-foreground mt-1">Level</div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="text-2xl font-bold text-accent">0</div>
            <div className="text-xs text-muted-foreground mt-1">Lives</div>
          </div>
        </div>
      </div>
    </div>
  );
}
