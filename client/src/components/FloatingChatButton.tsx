import { Button } from "@/components/ui/button";
import { MessageSquareText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FloatingChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
  hasUnread?: boolean;
}

export default function FloatingChatButton({
  onClick,
  isOpen,
  hasUnread = false
}: FloatingChatButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[60]"
    >
      <Button
        size="icon"
        className={
          "w-16 h-16 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 relative border-0 flex items-center justify-center overflow-hidden " +
          (isOpen 
            ? "bg-foreground text-background hover:bg-foreground/90 rotate-90" 
            : "bg-primary text-primary-foreground hover:shadow-primary/30 hover:shadow-xl")
        }
        onClick={onClick}
        data-testid="button-toggle-chat"
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <X className="w-16 h-16" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <MessageSquareText className="w-16 h-16" />
            </motion.div>
          )}
        </AnimatePresence>

        {hasUnread && !isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-destructive rounded-full border-2 border-background animate-pulse" />
        )}
      </Button>
    </motion.div>
  );
}
