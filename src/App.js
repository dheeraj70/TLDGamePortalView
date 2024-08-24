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

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // Show prompt when it's deferred
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowPrompt(false); // Hide prompt if the app is installed
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
      <Nav menuFull={menuFull} setMenuFull={setMenuFull} />

      {!isInstalled && deferredPrompt && showPrompt && (
        <Prompt handleInstallClick={handleInstallClick} handleClose={handleClosePrompt} />
      )}
      <SidePane
        isInGame={false}
        menuFull={menuFull}
        setMenuFull={setMenuFull}
      />
      <Outlet />
    </>
  );
}

export default App;
