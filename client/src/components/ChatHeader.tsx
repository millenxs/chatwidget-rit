import { Button } from "@/components/ui/button";
import { X, Minus, Music, Sparkles } from "lucide-react";

export interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export default function ChatHeader({ onMinimize, onClose }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-2 px-5 h-[72px] bg-primary text-primary-foreground shadow-lg relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center gap-3.5 relative z-10">
        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shadow-inner backdrop-blur-md border border-white/10 animate-pulse">
          <Music className="w-5.5 h-5.5 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[14px] font-bold tracking-tight">Ritmos do Coração</h1>
            <Sparkles className="w-3.5 h-3.5 text-white/60" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50" />
            <p className="text-[9px] font-medium text-white/70 uppercase tracking-wider">Online agora</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 relative z-10">
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          onClick={onMinimize}
          data-testid="button-minimize-chat"
          aria-label="Minimizar chat"
        >
          <Minus className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          onClick={onClose}
          data-testid="button-close-chat"
          aria-label="Fechar chat"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
