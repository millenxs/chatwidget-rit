import FloatingChatButton from "../FloatingChatButton";

export default function FloatingChatButtonExample() {
  return (
    <div className="h-32 relative bg-background">
      <FloatingChatButton
        onClick={() => console.log("Open chat clicked")}
        hasUnread={true}
      />
    </div>
  );
}
