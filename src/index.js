import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { Hero } from "./components/Hero";
import { Game } from "./components/Game";
import { Catalog } from './components/Catalog';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { SearchResult } from "./components/SearchResult";
import Notifications from "./components/Notifications";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path:'categories/:category_id',
        element : <Catalog category_hero={true} isIngame={false}/>
      },
      {
        path: "/game/:gameID",
            element: <Game />, 
      },
      {
        path: "/search/:query",
            element: <SearchResult />
      },
      {
        path: "/notifications",
            element: <Notifications />
      }
      
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
