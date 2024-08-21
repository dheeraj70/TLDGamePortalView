import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hero } from "./components/Hero";
import { IdealHero } from "./components/IdealHero";
import { Game } from "./components/Game";
import { Catalog } from './components/Catalog';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path:'categories/:categoryname',
        element : <Catalog category={true} name = {'categoryname'} games = {'[1,2,3,4]'}/>
      }
      
    ],
  },{
    path: "/game/:gameID",
        element: <Game />,

    
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
