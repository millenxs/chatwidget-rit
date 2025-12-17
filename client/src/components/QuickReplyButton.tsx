import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface QuickReplyButtonProps {
  title: string;
  payload: string;
  onClick: (payload: string) => void;
  disabled?: boolean;
}

export default function QuickReplyButton({
  title,
  payload,
  onClick,
  disabled = false
}: QuickReplyButtonProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="outline"
        size="sm"
        className="w-full text-left justify-start text-[12px] font-semibold min-h-[38px] whitespace-normal h-auto py-2.5 px-4 border-primary/20 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 rounded-xl"
        onClick={() => onClick(payload)}
        disabled={disabled}
        data-testid={`button-quick-reply-${payload}`}
      >
        {title}
      </Button>
    </motion.div>
  );
}
