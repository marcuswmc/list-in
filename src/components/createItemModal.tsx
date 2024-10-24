import { CircleX } from "lucide-react";
import { useState } from "react";

interface CreateItemModalProps {
  handleAddItem: (newItem: string, newQuantity: number) => void;
  handleCloseModal: () => void;
}

export function CreateItemModal({
  handleAddItem,
  handleCloseModal,
}: CreateItemModalProps) {
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddItem(newItem, newQuantity);
    setNewItem("");
    setNewQuantity(1);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="flex justify-center px-4 w-full max-w-96">
        <form
          className="flex flex-col gap-2 w-full bg-slate-900 p-4 rounded"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-end">
            <button type="button" onClick={handleCloseModal}>
              <CircleX size={22} color="#64748b"/>
            </button>
          </div>
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

          <button className="bg-slate-800 border rounded-full py-2 px-4 text-lg mt-4">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
