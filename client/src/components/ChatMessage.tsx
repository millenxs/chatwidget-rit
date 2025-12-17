import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ChatMessageProps {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatMessage({ text, isBot, timestamp }: ChatMessageProps) {
  const formattedTime = timestamp.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  // Helper to detect and render links
  const renderMessageContent = (content: string) => {
    // Regex optimized for various URL formats (http, www, or direct domains)
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-z]{2,}(?:\/[^\s]*)?)/gi;
    
    const parts = content.split(urlRegex);
    const matches = content.match(urlRegex);

    if (!matches) return content;

    let matchIndex = 0;
    return parts.map((part, i) => {
      // Check if this part is actually one of our matches
      if (matchIndex < matches.length && part === matches[matchIndex]) {
        matchIndex++;
        const href = part.toLowerCase().startsWith('http') ? part : `https://${part}`;
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "underline break-all transition-colors",
              isBot ? "text-primary hover:text-primary/70" : "text-white/90 hover:text-white"
            )}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex flex-col mb-4 w-full",
        isBot ? "items-start" : "items-end"
      )}
      data-testid={`message-${isBot ? "bot" : "user"}-${timestamp.getTime()}`}
    >
      <div
        className={cn(
          "px-4 py-3 max-w-[88%] whitespace-pre-wrap break-words text-[14.5px] leading-[1.5] shadow-sm overflow-hidden",
          isBot
            ? "bg-muted text-foreground rounded-[18px] rounded-tl-sm border border-border/50"
            : "bg-primary text-primary-foreground rounded-[18px] rounded-tr-sm font-medium shadow-primary/20"
        )}
      >
        {renderMessageContent(text)}
      </div>
      <span className={cn(
        "text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mt-1.5 px-2",
        !isBot && "text-right"
      )}>
        {formattedTime}
      </span>
    </motion.div>
  );
}
