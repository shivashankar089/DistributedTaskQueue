import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";
import ViewTask from "./components/ViewTasks.jsx";
import AddTask from "./components/AddTask.jsx";
import NumberTask from "./components/NumberTask.jsx";
import MessageTask from "./components/MessageTask.jsx";
import NotificationTask from "./components/NotificationTask.jsx";
import EmailTask from "./components/EmailTask.jsx";
import UserDetails from "./components/UserDetails.jsx";


function App() {

  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path:"",
          element: <Home />
        },
        {
          path: "home",
          element: <Home />
        },

        {
          path: "register",
          element: <Register />
        },

        {
          path: "login",
          element: <Login />
        },

        {
          path: "profile",
          element: <Profile />,
          children: [

            {
              index: true,
              element: <ViewTask />
            },
            {
              path:"view-task",
              element: <ViewTask />
            },

            {
              path: "add-task",
              element: <AddTask />
            },
            {
              path:"number-task",
              element:<NumberTask />
            },
            {
              path:"email-task",
              element:<EmailTask />
            },
            {
              path:"message-task",
              element:<MessageTask />
            },
            {
              path:"notification-task",
              element:<NotificationTask />
            }

          ]
        },
        {
          path:"user-details",
          element:<UserDetails />
        },
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;