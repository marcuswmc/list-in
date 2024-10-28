import { Copy } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

type ListCodeProps = {
  code: string;
};

export function ListCode(props: ListCodeProps) {
  function copyListCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  const { toast } = useToast();

  return (
    <button
      className="flex border border-indigo-800 px-2 py-2 gap-2 rounded overflow-hidden"
      onClick={() => {
        copyListCodeToClipboard();
        toast({
            title: "Copied to clipboard!",
            description: "share your code list.",
        });
      }}
    >
      <Copy size={20} color="#64748b" />
      <span className="w-32 truncate text-slate-400 text-sm">{props.code}</span>
    </button>
  );
}
