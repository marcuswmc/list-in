import { Plus } from "lucide-react";
import { useState } from "react";
import { Toaster } from "./ui/toaster";
import { useToast } from "../hooks/use-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../components/ui/dialog"


interface CreateItemModalProps {
  handleAddItem: (newItem: string, newQuantity: number) => void;
}

export function CreateItemModal({
  handleAddItem,
}: CreateItemModalProps) {
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);

  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddItem(newItem, newQuantity);
    setNewItem("");
    setNewQuantity(1);
  }

  return (
    <Dialog>
      <div className="fixed bottom-10 right-5 z-50">        
      <DialogTrigger asChild className="bg-black flex items-center justify-center border-2 border-indigo-800 p-2 rounded-full cursor-pointer">
      <Plus size={60} color="#64748b" />
      </DialogTrigger>
      </div>
      <DialogContent className="bg-slate-950 w-full max-w-80 rounded border border-indigo-800">
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <input
                name="title"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Product name..."
                className="bg-transparent outline-none text-xl placeholder-slate-700 truncate"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-500 text-lg">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="border px-2 text-2xl"
                  onClick={() =>
                    setNewQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  -
                </button>
                <span className="text-2xl">{newQuantity}</span>
                <button
                  type="button"
                   className="border px-2 text-2xl"
                  onClick={() => setNewQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button 
          className="bg-slate-800 border rounded-full py-2 px-4 text-lg mt-4"
          onClick={() => {
            toast({
              title: "Item added!",
              description: "Continue adding items to the list.",
            })
          }}
          >
            Add
          </button>
          <DialogClose className="">
            Cancel
          </DialogClose>

        </form>
    </DialogContent>
    <Toaster/>
    </Dialog>
  );
}
