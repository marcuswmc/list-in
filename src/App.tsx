import { useState } from "react";
import { CreateItemModal } from "./components/createItemModal";
import { Plus, Trash } from "lucide-react";

interface ListItem {
  id: number;
  title: string;
  quantity: number;
  isChecked: boolean
}

function App() {
  const [listItem, setListItem] = useState<ListItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleAddItem(newItem: string, newQuantity: number) {
    const newId = listItem.length + 1;
    setListItem([
      {
        id: newId,
        title: newItem,
        quantity: newQuantity,
        isChecked: false,
      },
      ...listItem,
    ]);
    setShowModal(false);
  }

  function handleDelete(id: number) {
    setListItem(listItem.filter((item) => item.id !== id));
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function toggleItemChecked(id: number) {
    setListItem(
      listItem.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }

  const filteredItems = listItem.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="max-w-4xl mx-auto h-full">
      <div className="p-4">
        <h1 className="text-indigo-800 text-3xl font-medium py-3">
          list<span className="text-slate-400 ">In</span>
        </h1>
        <p className="text-xl text-slate-600">Shared shopping list</p>

        <div className="flex my-8 border-b border-indigo-800">
          <input
            type="text"
            className="flex-grow bg-transparent outline-none p-2 text-lg text-slate-400 placeholder-slate-600 font-medium"
            placeholder="Search"
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-col gap-2 mt-10">
          {filteredItems.length < 1 ? (
            <span className="text-slate-800 text-3xl font-medium">
              Add some products...
            </span>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className={`flex justify-between border border-indigo-950 rounded items-center py-2 px-2 ${
                  item.isChecked ? "bg-slate-900" : ""
                }`}
              >
                <div className=" overflow-hidden flex gap-4 items-center">
                <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      className="absolute opacity-0 h-0 w-0"
                      checked={item.isChecked}
                      onChange={() => toggleItemChecked(item.id)}
                    />
                    <span
                      className={`block w-7 h-7 border rounded ${
                        item.isChecked
                          ? "bg-indigo-800 border-indigo-800"
                          : "bg-transparent border-indigo-800"
                      }`}
                    ></span>
                    {item.isChecked && (
                      <span className="absolute inset-0 flex items-center justify-center text-white">
                        ✓
                      </span>
                    )}
                  </label>
                  <p className={`text-lg text-ellipsis text-wrap truncate ${
                      item.isChecked
                        ? "line-through text-slate-500"
                        : "text-slate-300"
                    }`}>
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center gap-7 pl-2">
                  <p className={` text-lg ${
                    item.isChecked
                    ? "text-slate-500"
                    : "text-slate-300"
                    }`}>
                      {item.quantity}
                      </p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border border-indigo-950 p-2 rounded"
                  >
                    <Trash size={20} color="#64748b" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-10 right-5 z-50">
        <button
          onClick={handleOpenModal}
          className="bg-black flex items-center justify-center border-2 border-indigo-800 p-2 rounded-full"
        >
          <Plus size={40} color="#64748b" />
        </button>
      </div>

      <div className="bg-gradient-to-t from-background h-32 fixed w-full bottom-0"></div>

      {showModal && (
        <CreateItemModal
          handleAddItem={handleAddItem}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
