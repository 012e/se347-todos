import Nav from './Nav';
import Welcome from './Welcome'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import TopBar from './TopBar';
import TodoList from './TodoList';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/todo",
        element: <TodoList></TodoList>
      }
    ]
  }
]);

function Wrapper() {
  return <div className="flex flex-row">
    <Nav />
    <TopBar />
    <div className='pt-6'>
      <Outlet />
    </div>
  </div>
}

export default function App() {

  return <>
    <RouterProvider router={router} />
  </>
}
