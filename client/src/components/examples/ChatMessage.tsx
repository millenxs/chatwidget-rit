import ChatMessage from "../ChatMessage";

export default function ChatMessageExample() {
  return (
    <div className="p-4 bg-background space-y-4 max-w-md">
      <ChatMessage
        text="Olá! Eu sou o assistente virtual do Projeto Ritmos do Coração. Como posso te ajudar hoje?"
        isBot={true}
        timestamp={new Date()}
      />
      <ChatMessage
        text="Quero fazer uma doação"
        isBot={false}
        timestamp={new Date()}
      />
    </div>
  );
}
