export default function TypingIndicator() {
  return (
    <div className="flex items-start mb-4" data-testid="typing-indicator">
      <div className="bg-muted text-foreground rounded-[18px] rounded-tl-sm border border-border/50 px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 h-4 items-center">
          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.32s]" />
          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.16s]" />
          <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
