import ChatHeader from "../ChatHeader";

export default function ChatHeaderExample() {
  return (
    <div className="max-w-md">
      <ChatHeader
        onMinimize={() => console.log("Minimize clicked")}
        onClose={() => console.log("Close clicked")}
      />
    </div>
  );
}
