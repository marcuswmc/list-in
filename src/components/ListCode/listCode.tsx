import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

type ListShareProps = {
  code: string;
  link: string;
};



export function ListShare(props: ListShareProps) {
  function copyListCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }
  function copyListLink() {
    navigator.clipboard.writeText(props.link);
  }


 const { toast } = useToast();

  return (
    // <button
    //   className="flex border border-indigo-800 px-2 py-2 gap-2 rounded overflow-hidden"
    //   onClick={() => {
    //     copyListCodeToClipboard();
    //     toast({
    //         title: "Copied to clipboard!",
    //         description: "share your code list.",
    //     });
    //   }}
    // >
    //   <Copy size={20} color="#64748b" />
    //   <span className="w-32 truncate text-slate-400 text-sm">{props.code}</span>
    // </button>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Share your
          <span className="text-indigo-800 text-base">
            List<span className="text-slate-300">In</span>
          </span>
          <Share2 size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-950 w-full max-w-80 rounded border border-indigo-800">
        <DialogHeader className="text-start">
          <DialogTitle>Share code or link</DialogTitle>
          <DialogDescription className="text-start">
            Anyone who has this code or link will be able to view and edit this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="list-code" className="sr-only">
              Link
            </Label>
            <Input
              id="list-code"
              defaultValue={props.code}
              readOnly
              className="border rounded focus:border-indigo-500"
            />
          </div>

          <Button
            type="submit"
            className="px-3 rounded"
            onClick={() => {
              copyListCodeToClipboard();
              toast({
                title: "Code copied to clipboard!",
                description: "share your code list.",
              });
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-full flex items-center justify-center space-x-2">
                  <span className="h-px w-full bg-slate-600"></span>
                  <p className="text-slate-400 font-medium whitespace-nowrap">
                    or share your list link
                  </p>
                  <span className="h-px w-full bg-slate-600"></span>
                </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={props.link}
              readOnly
              className="border rounded focus:border-indigo-500 truncate"
            />
          </div>

          <Button
           onClick={() => {
            copyListLink();
            toast({
              title: "Link copied to clipboard!",
              description: "share your list.",
            });
          }}
           type="submit" className="px-3 rounded">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="rounded">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
