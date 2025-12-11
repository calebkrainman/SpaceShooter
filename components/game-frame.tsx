"use client";

import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export function GameFrame() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);

  // Listen for fullscreen changes (e.g., when user presses ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    const container = document.getElementById("game-container");

    if (!document.fullscreenElement) {
      try {
        await container?.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
        // Fallback to CSS fullscreen if browser doesn't support it
        setIsFullscreen(true);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error attempting to exit fullscreen:", err);
        setIsFullscreen(false);
      }
    }
  };

  const resetGame = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background p-4 md:p-8"
          : "max-w-6xl mx-auto"
      }`}
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
              title="Reset Game"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className="h-10 w-10 rounded-lg hover:bg-accent hover:text-accent-foreground bg-transparent"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Game Container */}
        <div
          id="game-container"
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-primary bg-card aspect-video"
        >
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading game...</p>
              </div>
            </div>
          )}

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-secondary rounded-tl-xl z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-secondary rounded-tr-xl z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-secondary rounded-bl-xl z-10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-secondary rounded-br-xl z-10 pointer-events-none" />

          {/* Live Game iframe */}
          <iframe
            key={key}
            src="https://calebkrainman.github.io/my-gdevelop-game/"
            title="Caleb's GDevelop Game"
            allowFullScreen
            allow="accelerometer; gyroscope; gamepad"
            className="w-full h-full absolute inset-0"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}
