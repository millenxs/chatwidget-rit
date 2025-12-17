export interface QuickReply {
    title: string;
    payload: string;
}

export interface BotResponse {
    text: string;
    quickReplies?: QuickReply[];
}

export interface IntentMatch {
    intent: string;
    keywords: string[];
}

export const intentMatches: IntentMatch[] = [
    {
        intent: "Menu_doacao",
        keywords: ["doar", "doação", "ajudar", "contribuir", "apoiar", "ajuda", "doacao"]
    },
    {
        intent: "Menu_nota_fiscal_paulista",
        keywords: ["nota fiscal", "nota paulista", "nfp", "nota"]
    },
    {
        intent: "Sub_doacao_pix",
        keywords: ["pix", "chave pix"]
    },
    {
        intent: "Sub_doacao_dinheiro_cartao",
        keywords: ["cartão", "cartao", "crédito", "credito", "débito", "debito", "boleto", "dinheiro"]
    },
    {
        intent: "Sub_doacao_entrega_itens",
        keywords: ["entregar", "entrega", "itens", "materiais", "presencial"]
    },
    {
        intent: "Sub_doacao_horarios_locais",
        keywords: ["horário", "horario", "endereço", "endereco", "localização", "localizacao", "sede"]
    },
    {
        intent: "Sub_doacao_bancaria",
        keywords: ["banco", "bancária", "bancaria", "ted", "doc", "transferência", "transferencia", "depósito", "deposito"]
    },
    {
        intent: "Sub_doacao_o_que_doar",
        keywords: ["o que doar", "aceita", "aceitam", "posso doar", "roupas", "brinquedos", "livros"]
    },
    {
        intent: "Sub_doacao_paypal",
        keywords: ["paypal"]
    },
    {
        intent: "Sub_nota_fiscal_cnpj",
        keywords: ["cnpj"]
    },
    {
        intent: "Sub_nota_fiscal_como_fazer",
        keywords: ["como doar", "como fazer", "passo a passo", "passos"]
    },
    {
        intent: "Sub_nota_fiscal_verificar_validacao",
        keywords: ["verificar", "validação", "validacao", "confirmada", "validou"]
    },
    {
        intent: "Sub_nota_fiscal_doacao_anonima",
        keywords: ["anônima", "anonima", "anônimo", "anonimo", "identificar"]
    },
    {
        intent: "Sub_nota_fiscal_doacao_automatica",
        keywords: ["automática", "automatica", "automaticamente"]
    },
    {
        intent: "Sub_nota_fiscal_cadastrar_nota",
        keywords: ["cadastrar", "cadastro nota"]
    },
    {
        intent: "Sub_nota_fiscal_prazo_validade",
        keywords: ["prazo", "validade", "vence", "limite"]
    },
    {
        intent: "Sub_nota_fiscal_problemas_comuns",
        keywords: ["problema", "erro", "não funciona", "nao funciona"]
    },
    {
        intent: "Sub_nota_fiscal_problemas_cadastro",
        keywords: ["problema cadastro", "desbloqueio", "acesso"]
    },
    {
        intent: "Sub_nota_fiscal_cadastro_pf",
        keywords: ["pessoa física", "pessoa fisica", "pf"]
    },
    {
        intent: "Sub_nota_fiscal_cadastro_pj",
        keywords: ["pessoa jurídica", "pessoa juridica", "pj", "empresa"]
    },
    {
        intent: "Sub_nota_fiscal_reativar_cadastro",
        keywords: ["reativar", "reativação", "reativacao", "inativo"]
    },
    {
        intent: "Sub_nota_fiscal_recuperar_senha",
        keywords: ["recuperar senha", "esqueci senha", "senha"]
    },
    {
        intent: "Sub_nota_fiscal_desbloqueio_senha",
        keywords: ["desbloquear", "desbloqueio senha", "bloqueada"]
    },
    {
        intent: "sobre_projeto",
        keywords: ["sobre", "projeto", "ong", "missão", "missao", "quem são", "quem sao"]
    },
    {
        intent: "localizacao_horarios",
        keywords: ["onde fica", "localização", "localizacao", "endereço", "endereco", "horário", "horario", "contato", "telefone"]
    },
    {
        intent: "voltar_menu_principal",
        keywords: ["voltar", "menu", "início", "inicio", "começo", "comeco"]
    },
    {
        intent: "greet",
        keywords: ["olá", "ola", "oi", "bom dia", "boa tarde", "boa noite", "hey", "hello"]
    },
    {
        intent: "affirm",
        keywords: ["sim", "yes", "claro", "pode ser", "quero", "tenho"]
    },
    {
        intent: "deny",
        keywords: ["não", "nao", "obrigado", "obrigada", "tchau", "valeu", "até logo"]
    }
];

export const responses: Record<string, BotResponse> = {
    greet: {
        text: "Olá! Eu sou o assistente virtual do Projeto Ritmos do Coração.\n\nComo posso te ajudar hoje?",
        quickReplies: [
            { title: "Fazer uma doação", payload: "Menu_doacao" },
            { title: "Nota Fiscal Paulista", payload: "Menu_nota_fiscal_paulista" },
            { title: "Localização e horários", payload: "localizacao_horarios" },
            { title: "Sobre o projeto", payload: "sobre_projeto" }
        ]
    },
    Menu_doacao: {
        text: "Você gostaria de fazer uma doação?\nConfira as opções disponíveis:",
        quickReplies: [
            { title: "Nota Fiscal Paulista", payload: "Menu_nota_fiscal_paulista" },
            { title: "Pix", payload: "Sub_doacao_pix" },
            { title: "Cartão de crédito ou débito", payload: "Sub_doacao_dinheiro_cartao" },
            { title: "Doação de itens", payload: "Sub_doacao_entrega_itens" },
            { title: "Entrega presencial", payload: "Sub_doacao_horarios_locais" },
            { title: "Voltar ao menu principal", payload: "voltar_menu_principal" }
        ]
    },
    Menu_nota_fiscal_paulista: {
        text: "Você escolheu doar pela Nota Fiscal Paulista.\nAqui estão as opções que posso te explicar:",
        quickReplies: [
            { title: "CNPJ da ONG", payload: "Sub_nota_fiscal_cnpj" },
            { title: "Como doar via Nota Fiscal", payload: "Sub_nota_fiscal_como_fazer" },
            { title: "Verificar se a doação foi validada", payload: "Sub_nota_fiscal_verificar_validacao" },
            { title: "Fazer doação anônima", payload: "Sub_nota_fiscal_doacao_anonima" },
            { title: "Configurar doação automática", payload: "Sub_nota_fiscal_doacao_automatica" },
            { title: "Onde e como cadastrar a nota", payload: "Sub_nota_fiscal_cadastrar_nota" },
            { title: "Prazo e validade", payload: "Sub_nota_fiscal_prazo_validade" },
            { title: "Problemas comuns", payload: "Sub_nota_fiscal_problemas_comuns" },
            { title: "Voltar ao menu principal", payload: "voltar_menu_principal" }
        ]
    },
    Sub_doacao_pix: {
        text: "Sim, aceitamos doações via PIX! É a forma mais rápida de nos apoiar.\n\nChave PIX (CNPJ da ONG):\n11.433.432/0001-02\n\nO favorecido que aparecerá é: Ritmos do Coração\n\nAgradecemos muito sua colaboração! Cada PIX nos ajuda a transformar vidas.",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_doacao_dinheiro_cartao: {
        text: "Você pode fazer uma doação de forma prática e segura:\n\n1. Doação em Dinheiro (Transferência/Depósito/PIX):\n\nBanco do Brasil\nAgência: 1817-1\nConta Corrente: 24.008-7\n\nBanco Itaú\nAgência: 1659\nConta Poupança: 21080-9 / 500\n\nPara PIX, use o CNPJ: 11.433.432/0001-02\n\n2. Doação com Cartão de Crédito, Débito ou Boleto:\n\nAcesse: ritmosdocoracao.org.br/doacao\n\nAgradecemos imensamente pelo seu apoio!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_doacao_entrega_itens: {
        text: "As doações de itens devem ser entregues exclusivamente na sede da ONG Ritmos do Coração.\n\nNosso Endereço:\nRua Barão de Aguiar, 108 – Parque Colonial – São Paulo/SP\nCEP: 04611-040 (próximo ao Aeroporto de Congonhas)\n\nHorário de Funcionamento:\nDe segunda a sexta-feira, das 09h às 17h.\n\nItens Aceitos:\n- Brinquedos em bom estado\n- Livros infantis\n- Instrumentos musicais usados e conservados\n\nNão Aceitamos:\n- Roupas usadas\n- Alimentos\n- Produtos de higiene\n\nAgradecemos sua colaboração!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_doacao_horarios_locais: {
        text: "A sede da ONG Ritmos do Coração está aberta para receber suas doações e visitas.\n\nEndereço:\nRua Barão de Aguiar, 108 – Parque Colonial, São Paulo/SP\nCEP: 04611-040\n(Próximo ao Aeroporto de Congonhas)\n\nHorário de Funcionamento:\nDe segunda a sexta-feira, das 09h às 17h.\n\nInformações Importantes:\n- As doações devem ser entregues pessoalmente na sede\n- Não fazemos retirada em domicílio\n- Não é possível realizar doações fora do horário comercial\n\nAgradecemos muito sua colaboração!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_doacao_bancaria: {
        text: "Você pode fazer uma doação por transferência bancária:\n\nBanco do Brasil\nAgência: 1817-1\nConta Corrente: 24.008-7\n\nBanco Itaú\nAgência: 1659\nConta Poupança: 21080-9 / 500\n\nPIX:\nCNPJ: 11.433.432/0001-02\nFavorecido: Ritmos do Coração\n\nTodas as doações ajudam a manter nossos projetos sociais!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_doacao_o_que_doar: {
        text: "Agradecemos sua vontade de doar materiais!\n\nO que Aceitamos:\n- Brinquedos e livros infantis em bom estado\n- Instrumentos musicais usados e conservados\n\nO que Não Aceitamos:\n- Roupas usadas\n- Alimentos\n- Produtos de higiene\n\nPara Entregar:\nEndereço: Rua Barão de Aguiar, 108 – Parque Colonial, São Paulo/SP\nHorário: Segunda a sexta, das 09h às 17h\n\nAgradecemos seu apoio!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_doacao_paypal: {
        text: "Você pode fazer sua doação de forma prática e segura utilizando PayPal ou Cartão de Crédito/Débito através da nossa página oficial:\n\nLink de Doação Oficial:\nritmosdocoracao.org.br/doacao\n\nNessa página, você escolhe o valor e a modalidade de pagamento (incluindo PayPal).\n\nAgradecemos muito o seu apoio!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_cnpj: {
        text: "Agradecemos por destinar sua Nota Fiscal Paulista à Ritmos do Coração!\n\nCNPJ da ONG (Chave de Cadastro):\n11.433.432/0001-02\n\nLembre-se de usá-lo no campo \"entidade beneficente\" ao realizar o cadastro de doação automática.\n\nAcesse o Site da Nota Fiscal Paulista:\nnfp.fazenda.sp.gov.br\n\nSe precisar de ajuda com o passo a passo do cadastro, é só perguntar!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_como_fazer: {
        text: "Você pode doar suas notas fiscais de duas formas:\n\n1. DOAÇÃO AUTOMÁTICA (Recomendado!):\n- Acesse nfp.fazenda.sp.gov.br e faça login\n- No menu, vá em \"Entidades\" > \"Doação de Cupons com CPF (automática)\"\n- Clique em \"Cadastrar Entidade\"\n- Informe o CNPJ: 11.433.432/0001-02\n- Confirme e escolha o período de doação\n\n2. DOAÇÃO MANUAL (Nota sem CPF):\n- Acesse o site e faça login\n- Vá em \"Doação de Cupons com Código de Barras\"\n- Digite os dados da nota\n- Escolha a entidade (CNPJ: 11.433.432/0001-02)\n- Confirme a doação!\n\nQualquer dúvida, é só perguntar!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_verificar_validacao: {
        text: "Para verificar se sua doação foi validada, siga esses passos:\n\n1. Acesse o site: nfp.fazenda.sp.gov.br\n2. Faça login com seu CPF e senha\n3. Clique em \"Doações\" > \"Doações Efetuadas\"\n4. Escolha o período e confira se sua doação foi registrada\n\nA confirmação pode demorar alguns dias para aparecer no sistema.",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_doacao_anonima: {
        text: "Sim! É totalmente possível fazer doações anônimas via Nota Fiscal Paulista.\n\nA doação anônima é feita utilizando cupons fiscais sem CPF no momento da compra.\n\nVocê pode cadastrar esses cupons manualmente pelo site da NFP:\nnfp.fazenda.sp.gov.br\n\nSua ajuda, mesmo anônima, é muito valiosa para a nossa ONG!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_doacao_automatica: {
        text: "Sim! Você pode doar automaticamente suas notas fiscais!\n\nPASSO A PASSO:\n1. Acesse: nfp.fazenda.sp.gov.br\n2. Faça login com seu CPF e senha\n3. No menu, clique em: \"Entidades\" > \"Doação de Cupons com CPF (automática)\"\n4. Clique em \"Cadastrar Entidade\"\n5. Digite o CNPJ: 11.433.432/0001-02\n6. Escolha o período (geralmente 1 ano) e confirme\n\nPronto! Suas notas com CPF serão doadas automaticamente.\n\nVocê também pode fazer isso pelo aplicativo da Nota Fiscal Paulista!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_cadastrar_nota: {
        text: "Você pode configurar a doação tanto pelo site quanto pelo aplicativo:\n\nPelo SITE:\n1. Acesse: nfp.fazenda.sp.gov.br\n2. Clique em \"Acesso ao Sistema\" e faça login\n3. No menu, vá em: Entidades > Doação de Cupons com CPF (automática)\n4. Clique em \"Cadastrar Entidade\"\n5. Digite o CNPJ: 11.433.432/0001-02\n6. Escolha o período e confirme\n\nPelo APLICATIVO:\n1. Baixe o app oficial da Nota Fiscal Paulista\n2. Faça login com seu CPF e senha\n3. Toque em \"Doação Automática com CPF\"\n4. Cadastre a entidade com o CNPJ: 11.433.432/0001-02\n5. Escolha o período e confirme",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_prazo_validade: {
        text: "Prazos e Validade da Nota Fiscal Paulista:\n\nSua nota fiscal com CPF tem prazo de até 90 dias a partir da data da compra para ser validada no sistema.\n\n- Prazo limite: 90 dias\n- A nota pode levar até 10 dias úteis para aparecer no sistema após a compra\n\nDica: Para não perder nenhuma nota, cadastre sua doação como automática pelo site ou aplicativo!\n\nPosso te mostrar como ativar a doação automática!",
        quickReplies: [
            { title: "Configurar doação automática", payload: "Sub_nota_fiscal_doacao_automatica" },
            { title: "Voltar ao menu", payload: "Menu_nota_fiscal_paulista" }
        ]
    },
    Sub_nota_fiscal_problemas_comuns: {
        text: "Se você está com problemas para cadastrar ou doar sua nota fiscal, pode ser por alguns motivos:\n\n- Prazo de doação de 90 dias expirado\n- Cupom fiscal com informações incorretas\n- Nota ainda não processada (pode levar até 10 dias úteis)\n- Problemas técnicos no site da Nota Fiscal Paulista\n\nSe a situação persistir, entre em contato com o suporte:\nportal.fazenda.sp.gov.br/servicos/nfp/\n\nTente novamente mais tarde. Agradecemos sua paciência!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_problemas_cadastro: {
        text: "Para solucionar problemas de cadastro, login ou senha na Nota Fiscal Paulista:\n\n- Cadastro de Pessoa Física (CPF)\n- Cadastro de Pessoa Jurídica (CNPJ)\n- Reativação ou Desbloqueio de Cadastro\n- Recuperação e Desbloqueio de Senha\n\nAcesse o guia completo:\nportal.fazenda.sp.gov.br/servicos/nfp/Paginas/Guia-Cadastro-PF.aspx",
        quickReplies: [
            { title: "Cadastro Pessoa Física", payload: "Sub_nota_fiscal_cadastro_pf" },
            { title: "Cadastro Pessoa Jurídica", payload: "Sub_nota_fiscal_cadastro_pj" },
            { title: "Recuperar senha", payload: "Sub_nota_fiscal_recuperar_senha" },
            { title: "Voltar ao menu", payload: "Menu_nota_fiscal_paulista" }
        ]
    },
    Sub_nota_fiscal_cadastro_pf: {
        text: "Para cadastrar-se como Pessoa Física (PF) no programa Nota Fiscal Paulista:\n\n1. Acesse: nfp.fazenda.sp.gov.br\n2. Clique em \"Cadastrar-se\" ou \"Primeiro Acesso\"\n3. Selecione \"Pessoa Física\"\n4. Preencha CPF, nome, data de nascimento, endereço e e-mail\n5. Crie uma senha segura (mínimo 8 caracteres)\n6. Aceite os termos e clique em \"Cadastrar\"\n7. Verifique seu e-mail para confirmar\n\nApós o cadastro, você já poderá doar suas notas fiscais!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_cadastro_pj: {
        text: "Cadastro Pessoa Jurídica na Nota Fiscal Paulista:\n\nEssa opção é para empresas não contribuintes do ICMS.\n\nDocumentos necessários:\nCNPJ da empresa, CPF do representante legal e E-mail válido\n\nPasso a passo:\n1. Acesse: nfp.fazenda.sp.gov.br\n2. Clique em \"Cadastro Pessoa Jurídica\"\n3. Preencha os dados conforme a Receita Federal\n4. Complete os campos adicionais\n5. Clique em \"Solicitar Cadastramento\"\n\nO acesso é liberado imediatamente!",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_reativar_cadastro: {
        text: "Reativação de Cadastro - Nota Fiscal Paulista:\n\nEste processo é para quem inativou o cadastro e recebe a mensagem \"Erro: Usuário inativo\".\n\nOnde solicitar:\n1. Presencialmente em um Posto Fiscal da SEFAZ-SP\n2. Por via postal, enviando documentação para:\n   Secretaria da Fazenda e Planejamento\n   Av. Rangel Pestana, 300 – Centro – São Paulo/SP\n   CEP 01017-911\n\nDocumentos para Pessoa Física:\n- Requerimento específico (site da NFP)\n- Documento oficial com foto\n- CPF",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_recuperar_senha: {
        text: "Recuperar Senha - Nota Fiscal Paulista:\n\n1. Acesse: portal.fazenda.sp.gov.br/servicos/nfp\n2. Clique em \"Esqueci minha senha\"\n3. Digite seu CPF ou CNPJ\n4. Clique em \"Ok\"\n5. Escolha uma opção:\n   - Envio da frase de lembrete (por e-mail)\n   - Envio do link para nova senha (por e-mail)\n   - Recadastrar senha (último caso)\n\nAlternativa: Você também pode acessar via conta gov.br ou certificado digital.",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    Sub_nota_fiscal_desbloqueio_senha: {
        text: "Desbloqueio de Senha - Cadastro Pendente:\n\nSe você recebe a mensagem \"Cadastro pendente de desbloqueio de senha\":\n\nMotivos comuns:\n- Pontuação insuficiente no Termômetro de Confiabilidade\n- Recadastramento solicitado\n- Tentativas de transferência sem sucesso\n- Suspeita de fraude\n\nComo resolver:\n1. Acesse: portal.fazenda.sp.gov.br/servicos/nfp\n2. Faça login com sua conta gov.br\n3. Siga as orientações na tela para o desbloqueio",
        quickReplies: [
            { title: "Sim, tenho mais dúvidas", payload: "affirm" },
            { title: "Não, obrigado", payload: "deny" }
        ]
    },
    sobre_projeto: {
        text: "O Projeto Ritmos do Coração é uma ONG que trabalha com inclusão social e cidadania através da música e arte!\n\nNossa missão é transformar vidas de crianças, jovens e pessoas com deficiência, oferecendo:\n\n- Aulas de música e instrumentos\n- Atividades culturais e educacionais\n- Apoio social e familiar\n\nConheça mais em: ritmosdocoracao.org.br\n\nCNPJ: 11.433.432/0001-02\n\nComo podemos te ajudar hoje?",
        quickReplies: [
            { title: "Fazer uma doação", payload: "Menu_doacao" },
            { title: "Nota Fiscal Paulista", payload: "Menu_nota_fiscal_paulista" },
            { title: "Localização e horários", payload: "localizacao_horarios" }
        ]
    },
    localizacao_horarios: {
        text: "Informações de localização e contato:\n\nNossa Sede:\nRua Barão de Aguiar, 108 – Parque Colonial\nSão Paulo/SP – CEP 04611-040\n(Próximo ao Aeroporto de Congonhas)\n\nHorário de Funcionamento:\nSegunda a sexta-feira, das 09h às 17h\n\nContato:\nE-mail: contato@ritmosdocoracao.org.br\nTelefone: (11) 93900-9467\n\nVocê pode nos visitar ou fazer entregas de doações nesse horário!",
        quickReplies: [
            { title: "Fazer uma doação", payload: "Menu_doacao" },
            { title: "Nota Fiscal Paulista", payload: "Menu_nota_fiscal_paulista" },
            { title: "Sobre o projeto", payload: "sobre_projeto" }
        ]
    },
    voltar_menu_principal: {
        text: "Olá! Eu sou o assistente virtual do Projeto Ritmos do Coração.\n\nComo posso te ajudar hoje?",
        quickReplies: [
            { title: "Fazer uma doação", payload: "Menu_doacao" },
            { title: "Nota Fiscal Paulista", payload: "Menu_nota_fiscal_paulista" },
            { title: "Localização e horários", payload: "localizacao_horarios" },
            { title: "Sobre o projeto", payload: "sobre_projeto" }
        ]
    },
    affirm: {
        text: "Ótimo! Vou te mostrar o menu novamente.",
        quickReplies: [
            { title: "Fazer uma doação", payload: "Menu_doacao" },
            { title: "Nota Fiscal Paulista", payload: "Menu_nota_fiscal_paulista" },
            { title: "Localização e horários", payload: "localizacao_horarios" },
            { title: "Sobre o projeto", payload: "sobre_projeto" }
        ]
    },
    deny: {
        text: "Obrigado por conversar comigo!\n\nSe precisar de mais informações sobre doações, é só me chamar novamente.\n\nSua ajuda faz toda a diferença para o Projeto Ritmos do Coração!\n\nSe quiser reiniciar a conversa, é só mandar um Oi",
        quickReplies: []
    },
    fallback: {
        text: "Desculpe, não consegui entender o que você disse.\n\nPor favor, escolha uma das opções do menu ou reformule sua pergunta.",
        quickReplies: [
            { title: "Voltar ao menu principal", payload: "voltar_menu_principal" }
        ]
    }
};

export function detectIntent(userMessage: string): string {
    const message = userMessage.toLowerCase().trim();

    for (const match of intentMatches) {
        for (const keyword of match.keywords) {
            if (message.includes(keyword.toLowerCase())) {
                return match.intent;
            }
        }
    }

    return "fallback";
}

export function getResponse(intent: string): BotResponse {
    return responses[intent] || responses.fallback;
}
