import type { Express } from "express";
import { createServer, type Server } from "http";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Você é o assistente oficial da ONG Ritmos do Coração. 
    Seu foco principal é ajudar usuários com dúvidas sobre a Nota Fiscal Paulista (NFP) e sobre como as doações ajudam a ONG.
    Informações importantes da ONG:
    - Site: https://ritmosdocoracao.org.br
    - CNPJ: 11.433.432/0001-02
    - Missão: Inclusão social e cidadania através da música e arte para crianças, jovens e pessoas com deficiência.
    - Endereço: Rua Barão de Aguiar, 108 – Parque Colonial – São Paulo/SP.
    
    Sobre Nota Fiscal Paulista:
    - Incentive a doação automática pelo site ou app da NFP.
    - O CNPJ para cadastro é 11.433.432/0001-02.
    - Explique que notas sem CPF também podem ser doadas manualmente.
    
    Seja amigável, prestativo e profissional. Responda em Português.`
});

export async function registerRoutes(
    httpServer: Server,
    app: Express
): Promise<Server> {

    app.post("/api/chat", async (req, res) => {
        try {
            const { message, history } = req.body;

            if (!process.env.GEMINI_API_KEY) {
                return res.status(500).json({ message: "Configuração de API (GEMINI_API_KEY) não encontrada." });
            }

            const chat = model.startChat({
                history: history || [],
            });

            const result = await chat.sendMessage(message);
            const response = await result.response;
            const text = response.text();

            res.json({ text });
        } catch (error: any) {
            console.error("Gemini Error:", error);
            res.status(500).json({ message: "Erro ao processar mensagem com a IA." });
        }
    });

    return httpServer;
}
