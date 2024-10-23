import { useState } from "react";
import { CreateItemModal } from "./components/createItemModal";
import { Plus, Trash } from "lucide-react";

interface ListItem {
  id: number;
  title: string;
  quantity: number;
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

  const filteredItems = listItem.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="max-w-4xl mx-auto h-full">
      <div className="p-4">
        <h1 className="text-indigo-600 text-3xl font-medium py-3">
          list<span className="text-slate-200 ">In</span>
        </h1>
        <p className="text-lg text-slate-600">
          Lista de compra compartilhada
        </p>
        <div className="h-[1px] bg-indigo-700 my-8"></div>
        <div></div>

        <div className="flex flex-col gap-2 mt-10">
          {filteredItems.length < 1 ? (
            <span className="text-slate-800 text-3xl font-medium">Add some products...</span>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border border-indigo-950 rounded items-center py-2 px-4"
              >
                <div>
                  <p className="text-lg text-slate-200">{item.title}</p>
                  <p className="text-slate-500 text-sm">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="flex gap-6">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border border-indigo-950 p-2 rounded"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-10 right-5 left-5 flex items-center gap-4 z-50">
        <input
          type="text"
          className="flex-grow border-2 border-indigo-700 rounded-full bg-black outline-none p-3 text-lg truncate placeholder-slate-700"
          placeholder="Search"
          onChange={handleSearch}
        />
        <button
          onClick={handleOpenModal}
          className="bg-black flex items-center justify-center border-2 border-indigo-700 p-2 rounded-full"
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
