import { useEffect, useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { SidePane } from "./components/SidePane";
import { Outlet } from "react-router-dom";
import { Prompt } from "./components/Prompt";

function App() {
  const [menuFull, setMenuFull] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [isPromptSupported, setIsPromptSupported] = useState(true); // Track prompt support

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      if (!e) return; // Handle case where event is not provided
      console.log("beforeinstallprompt event fired"); // Add this line
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); 
    };
  
    if ('BeforeInstallPromptEvent' in window) {
      // Check for beforeinstallprompt event support
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    } else {
      setIsPromptSupported(false); // No support for beforeinstallprompt
    }
  
    window.addEventListener("appinstalled", () => {
      console.log("App installed"); // Add this line
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  
    return () => {
      if (isPromptSupported) {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      }
    };
  }, [isPromptSupported]);
  
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
      <Nav 
        menuFull={menuFull} 
        setMenuFull={setMenuFull} 
        isNotInstalled={!isInstalled && (isPromptSupported ? deferredPrompt : true)} 
        handleInstallClick={handleInstallClick}
      />

      {!isInstalled && (isPromptSupported ? deferredPrompt : true) && showPrompt && (
        <Prompt handleInstallClick={handleInstallClick} handleClose={handleClosePrompt} />
      )}
      <SidePane
        isInGame={false}
        menuFull={menuFull}
        setMenuFull={setMenuFull}
        isNotInstalled={!isInstalled && (isPromptSupported ? deferredPrompt : true)}
        handleInstallClick={handleInstallClick}
      />
      <Outlet />
    </>
  );
}

export default App;
