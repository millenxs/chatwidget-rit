import QuickReplyButton from "../QuickReplyButton";

export default function QuickReplyButtonExample() {
  return (
    <div className="p-4 bg-background space-y-2 max-w-md">
      <QuickReplyButton
        title="Fazer uma doação"
        payload="Menu_doacao"
        onClick={(payload) => console.log("Clicked:", payload)}
      />
      <QuickReplyButton
        title="Nota Fiscal Paulista"
        payload="Menu_nota_fiscal_paulista"
        onClick={(payload) => console.log("Clicked:", payload)}
      />
      <QuickReplyButton
        title="Botão desabilitado"
        payload="disabled"
        onClick={(payload) => console.log("Clicked:", payload)}
        disabled={true}
      />
    </div>
  );
}
