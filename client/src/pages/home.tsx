import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  SendHorizontal, 
  Paperclip, 
  Sparkles, 
  ChevronRight,
  RefreshCcw,
  ArrowLeft
} from "lucide-react";
import { getResponse, detectIntent, responses } from "@shared/chatData";
import { cn } from "@/lib/utils";
import ChatMessage from "@/components/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuickRepliesContainer from "@/components/QuickRepliesContainer";
import TypingIndicator from "@/components/TypingIndicator";
import ChatWidget from "@/components/ChatWidget";

interface ChatLog {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatLog[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState([]);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSend = (text: string = input, intentOverride?: string) => {
    if (!text.trim()) return;

    const userMsg: ChatLog = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setCurrentQuickReplies([]);

    setTimeout(() => {
      const intent = intentOverride || detectIntent(text);
      const response = getResponse(intent);
      
      const botMsg: ChatLog = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setCurrentQuickReplies(response.quickReplies || []);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (payload: string) => {
    // Find the human-readable title from the buttons currently visible
    const qr = currentQuickReplies.find(r => r.payload === payload);
    const title = qr ? qr.title : payload;
    
    // Send the title as the message text, but use the payload as the direct intent
    handleSend(title, payload);
  };

  const generateSuggestion = () => {
    // Collect all titles from all quick replies in responses
    const allSuggestions = Object.values(responses).flatMap(r => r.quickReplies || []).map(qr => qr.title);
    
    // Add some common questions manually for more variety
    const manualSuggestions = [
        "Como doar via Nota Fiscal Paulista?",
        "Qual o CNPJ da ONG?",
        "Onde fica a sede?",
        "Que horas vocês abrem?",
        "Posso doar brinquedos?",
        "Como cadastrar nota sem CPF?",
        "O projeto ajuda quem?",
        "Como fazer doação automática?"
    ];

    const uniqueSuggestions = Array.from(new Set([...allSuggestions, ...manualSuggestions]));
    const randomSuggestion = uniqueSuggestions[Math.floor(Math.random() * uniqueSuggestions.length)];
    
    setInput(randomSuggestion);
    
    // Smoothly focus textarea
    if (textareaRef.current) {
        textareaRef.current.focus();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuickReplies([]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-white text-foreground font-sans selection:bg-primary/10 overflow-hidden">
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <ScrollArea className="flex-1 w-full" ref={scrollAreaRef}>
          <div className="max-w-3xl mx-auto px-6 flex flex-col min-h-full">
            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div 
                  key="welcome"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col items-center justify-center min-h-[70vh]"
                >
                  <div className="w-20 h-20 mb-8 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6] via-[#a855f7] to-[#ef4444] rounded-[22px] blur-2xl opacity-30 animate-pulse" />
                      <div className="relative z-10 w-full h-full bg-white rounded-[22px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#3b82f6] via-[#a855f7] to-[#ef4444] opacity-90" />
                          <Music className="w-10 h-10 text-white relative z-20" />
                      </div>
                  </div>
                  <h1 className="text-[28px] font-semibold tracking-tight text-[#1a1c1e]">Your Ritmos for work</h1>
                </motion.div>
              ) : (
                <motion.div 
                   key="chat"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="w-full flex flex-col gap-6 pt-12 pb-60"
                >
                   {messages.map((m) => (
                      <ChatMessage 
                        key={m.id}
                        text={m.text}
                        isBot={m.isBot}
                        timestamp={m.timestamp}
                      />
                   ))}
                   {isTyping && <TypingIndicator />}
                   {!isTyping && currentQuickReplies.length > 0 && (
                      <div className="max-w-full mr-auto">
                        <QuickRepliesContainer 
                          replies={currentQuickReplies} 
                          onSelect={handleQuickReply} 
                        />
                      </div>
                   )}
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </ScrollArea>

        {/* Input Area - Minimalist matching the design */}
        <div className="absolute bottom-8 left-0 right-0 px-6 pointer-events-none">
            <div className="max-w-[680px] mx-auto pointer-events-auto">
                <div className="bg-white rounded-[32px] shadow-[0_12px_48px_rgba(0,0,0,0.06)] border border-[#e5e7eb] p-4 transition-all focus-within:shadow-[0_12px_64px_rgba(0,0,0,0.08)] focus-within:border-[#d1d5db]">
                    <div className="relative flex flex-col">
                        <textarea 
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="A whole new way to work."
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none resize-none text-[17px] leading-[1.6] text-[#1a1c1e] placeholder-[#9ca3af] min-h-[32px] max-h-60 p-2 scrollbar-hide font-medium transition-all outline-none"
                            rows={1}
                        />
                        <div className="flex items-center justify-between px-2 pt-2 select-none pointer-events-none opacity-40 translate-y-2">
                            <div className="text-[10px] text-[#9ca3af] font-bold tracking-widest uppercase">
                                {input.length} / 500
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={generateSuggestion}
                                className="p-1.5 rounded-lg hover:bg-neutral-50 text-[#6b7280] transition-colors focus:outline-none focus:ring-2 focus:ring-primary/10 active:scale-95"
                                title="Gerar sugestão"
                            >
                                <Sparkles className="w-[18px] h-[18px]" />
                            </button>
                        </div>

                        <button 
                            onClick={() => handleSend()}
                            disabled={!input.trim() && !isTyping}
                            className={cn(
                                "flex items-center justify-center transition-all",
                                input.trim() 
                                    ? "text-[#1a1c1e] hover:scale-110 active:scale-95" 
                                    : "text-[#d1d5db] cursor-not-allowed"
                            )}
                        >
                            <SendHorizontal className="w-5 h-5 rotate-[-0deg]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={resetChat}
            className="fixed top-8 right-8 p-3 bg-white shadow-lg border border-neutral-100 rounded-full text-neutral-500 hover:text-primary transition-all hover:scale-110 z-20"
            title="Nova Conversa"
          >
            <RefreshCcw className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-[12px] text-[#9ca3af] font-medium tracking-tight bg-white">
        © 2025 Millena Medeiros - Desenvolvedora Fullstack
      </footer>

      <ChatWidget />
    </div>
  );
}
