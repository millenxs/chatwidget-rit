import QuickReplyButton from "./QuickReplyButton";
import type { QuickReply } from "@shared/chatData";

export interface QuickRepliesContainerProps {
  replies: QuickReply[];
  onSelect: (payload: string) => void;
  disabled?: boolean;
}

export default function QuickRepliesContainer({
  replies,
  onSelect,
  disabled = false
}: QuickRepliesContainerProps) {
  if (!replies || replies.length === 0) return null;

  return (
    <div
      className="flex flex-col gap-2 mb-3"
      data-testid="quick-replies-container"
    >
      {replies.map((reply, index) => (
        <QuickReplyButton
          key={`${reply.payload}-${index}`}
          title={reply.title}
          payload={reply.payload}
          onClick={onSelect}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
