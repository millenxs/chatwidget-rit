import { useState, useEffect, useRef } from "react";
import { responses, detectIntent, getResponse, type QuickReply } from "@shared/chatData";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import QuickRepliesContainer from "./QuickRepliesContainer";
import TypingIndicator from "./TypingIndicator";
import FloatingChatButton from "./FloatingChatButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: QuickReply[];
}

const STORAGE_KEY = "ritmos_chat_history";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<QuickReply[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restored = parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(restored);
        if (restored.length > 0) {
          const lastBotMessage = [...restored].reverse().find((m: Message) => m.isBot);
          if (lastBotMessage?.quickReplies) {
            setCurrentQuickReplies(lastBotMessage.quickReplies);
          }
        }
      } catch (e) {
        console.error("Failed to restore chat history:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && messages.length === 0) {
      sendBotMessage("greet");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFullClose = () => {
    setIsOpen(false);
    // Pequeno atraso para limpar após a animação de saída
    setTimeout(() => {
      setMessages([]);
      setCurrentQuickReplies([]);
      setInputText("");
      localStorage.removeItem(STORAGE_KEY);
    }, 300);
  };

  const sendBotMessage = (intent: string) => {
    setIsTyping(true);
    setCurrentQuickReplies([]);

    setTimeout(() => {
      const response = getResponse(intent);
      const newMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        quickReplies: response.quickReplies
      };

      setMessages((prev) => [...prev, newMessage]);
      setCurrentQuickReplies(response.quickReplies || []);
      setIsTyping(false);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentQuickReplies([]);
    
    const intent = detectIntent(inputText);
    setInputText("");
    
    sendBotMessage(intent);
  };

  const handleQuickReplyClick = (payload: string) => {
    const buttonTitle = currentQuickReplies.find((r) => r.payload === payload)?.title || payload;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: buttonTitle,
      isBot: false,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentQuickReplies([]);

    sendBotMessage(payload);
  };

  return (
    <>
      <FloatingChatButton onClick={toggleOpen} isOpen={isOpen} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bottom-24 right-6 z-50 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl transition-all",
              "md:w-[340px] md:h-[480px]",
              "w-[calc(100vw-32px)] h-[calc(100vh-140px)] max-h-[600px]"
            )}
            data-testid="chat-widget-container"
          >
            <div className="flex flex-col h-full">
              <ChatHeader onMinimize={handleClose} onClose={handleFullClose} />

              <ScrollArea className="flex-1 px-5 pt-6" ref={scrollAreaRef}>
                <div role="log" aria-live="polite" className="pb-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      text={message.text}
                      isBot={message.isBot}
                      timestamp={message.timestamp}
                    />
                  ))}

                  {isTyping && (
                    <div className="mb-4">
                      <TypingIndicator />
                    </div>
                  )}

                  {!isTyping && currentQuickReplies.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mt-6"
                    >
                      <QuickRepliesContainer
                        replies={currentQuickReplies}
                        onSelect={handleQuickReplyClick}
                      />
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <div className="p-3 bg-muted/30 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-muted-foreground/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      inputText.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <SendHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
