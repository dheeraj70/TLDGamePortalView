import { useEffect, useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { SidePane } from "./components/SidePane";
import { Outlet , useLocation} from "react-router-dom";
import { Prompt } from "./components/Prompt";

function App() {
  const [menuFull, setMenuFull] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const location = useLocation();
  const isAuthRoute = location.pathname === '/auth';

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log("beforeinstallprompt event fired"); // Add this line
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); 
    };
  
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  
    window.addEventListener("appinstalled", () => {
      console.log("App installed"); // Add this line
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);
  

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowPrompt(false); // Hide prompt after interaction
      });
    }
  };

  const handleClosePrompt = () => {
    setShowPrompt(false); // Hide prompt when close button is clicked
  };

  return (
    <>
      <Nav menuFull={menuFull} setMenuFull={setMenuFull} isNotInstalled={!isInstalled && deferredPrompt} handleInstallClick={handleInstallClick}/>

      {!isInstalled && deferredPrompt && showPrompt && (
        <Prompt handleInstallClick={handleInstallClick} handleClose={handleClosePrompt} />
      )}
      {true && <SidePane
        isInGame={false}
        menuFull={menuFull}
        setMenuFull={setMenuFull}
        isNotInstalled={!isInstalled && deferredPrompt}
        handleInstallClick={handleInstallClick}
      />}
      <Outlet />
    </>
  );
}

export default App;
