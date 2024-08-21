//import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';

import { Nav } from './components/Nav';
import { SidePane } from './components/SidePane'
import { Outlet } from 'react-router-dom'



function App() {
  /*const ff =async ()=>{
    const o = await fetch("http://localhost:8080/games")
    const res = await o.text();
    console.log(res);
  }
  useEffect( ()=>{
    ff();
  },[])*/
  return (
    <>
    <Nav />
    
      
        <SidePane isInGame = {false}/>
        <Outlet />
        

    </>
  );
}

export default App;
