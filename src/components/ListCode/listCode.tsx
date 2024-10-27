import { Copy } from "lucide-react";

type ListCodeProps = {
  code: string;
  }
  
  export function ListCode(props: ListCodeProps) {
  
      function copyListCodeToClipboard() {
          navigator.clipboard.writeText(props.code);
      }
  
      return (
          <button className="flex border border-indigo-800 px-2 py-2 gap-2 rounded overflow-hidden" onClick={copyListCodeToClipboard}>
              <Copy size={20} color="#64748b" />
              <span className="w-32 truncate text-slate-400 text-sm">{props.code}</span>
          </button>
      )
  }