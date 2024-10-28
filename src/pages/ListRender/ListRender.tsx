import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreateItemModal } from "../../components/createItemModal";
import { Plus, Trash } from "lucide-react";
import { ListCode } from "../../components/ListCode/listCode";
import { Toaster } from "../../components/ui/toaster";

interface ListItem {
  _id: string;
  title: string;
  quantity: number;
  isChecked: boolean;
}

export function ListRender() {
  const { listId } = useParams();
  const [listName, setListName] = useState("")
  const [listItem, setListItem] = useState<ListItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        const listNameResponse = await axios.get(`https://listin-server-production.up.railway.app/api/lists/${listId}`);
        setListName(listNameResponse.data.name);
        console.log(listNameResponse);
  
        const response = await axios.get(`https://listin-server-production.up.railway.app/api/lists/${listId}/items`);
        setListItem(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, [listId]);
  

  const API_BASE_URL = `https://listin-server-production.up.railway.app/api/lists/${listId}/items`;

  async function handleAddItem(newItem: string, newQuantity: number) {
    try {
      const response = await axios.post(API_BASE_URL, {
        title: newItem,
        quantity: newQuantity,
      });
      setListItem((prevItem) => [response.data, ...prevItem]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
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

  async function handleDelete(_id: string) {
    try {
      await axios.delete(`${API_BASE_URL}/${_id}`);
      setListItem((prevItem) => prevItem.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function toggleItemChecked(_id: string) {
    const item = listItem.find((item) => item._id === _id);
    if (!item) return;
    try {
      const response = await axios.put(`${API_BASE_URL}/${_id}`, {
        isChecked: !item.isChecked,
      });
      setListItem((prevItems) =>
        prevItems.map((item) =>
          item._id === _id ? { ...item, isChecked: response.data.isChecked } : item
        )
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  const filteredItems = listItem.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto h-full">
      <div className="p-4">
        
        <div className="flex justify-between items-center">
        <h1 className="text-indigo-800 text-3xl font-medium py-3">
          list<span className="text-slate-400 ">In</span>
        </h1>
        <ListCode code={`${listId}`}/>
        </div>
        <p className="text-xl text-slate-400 font-medium">{listName}</p>

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
            <button
            onClick={handleOpenModal}
            className="text-slate-800 text-3xl font-medium">
              Add some products...
            </button>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item._id}
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
                      onChange={() => toggleItemChecked(item._id)}
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
                  <p
                    className={`text-lg text-ellipsis text-wrap truncate ${
                      item.isChecked
                        ? "line-through text-slate-500"
                        : "text-slate-300"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center gap-7 pl-2">
                  <p
                    className={` text-lg ${
                      item.isChecked ? "text-slate-500" : "text-slate-300"
                    }`}
                  >
                    {item.quantity}
                  </p>
                  <button
                    onClick={() => handleDelete(item._id)}
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
          <Toaster/>

      {showModal && (
        <CreateItemModal
          handleAddItem={handleAddItem}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

