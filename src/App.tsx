import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ListRender } from "./pages/ListRender/ListRender";
import { AuthPage } from "./pages/CreateList/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/lists/:listId",
    element: <ListRender />,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
