import QuickRepliesContainer from "../QuickRepliesContainer";

export default function QuickRepliesContainerExample() {
  const replies = [
    { title: "Fazer uma doação", payload: "Menu_doacao" },
    { title: "Nota Fiscal Paulista", payload: "Menu_nota_fiscal_paulista" },
    { title: "Localização e horários", payload: "localizacao_horarios" },
    { title: "Sobre o projeto", payload: "sobre_projeto" }
  ];

  return (
    <div className="p-4 bg-background max-w-md">
      <QuickRepliesContainer
        replies={replies}
        onSelect={(payload) => console.log("Selected:", payload)}
      />
    </div>
  );
}
