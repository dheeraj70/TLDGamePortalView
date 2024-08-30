import React, { useEffect, useState } from "react";
import { useRouteError , useNavigate} from "react-router-dom";
import'./Error.css';

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [counter,setCounter] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      navigate('/');
    }

    return () => clearInterval(interval);
  }, [counter, navigate]);

  return (
    <div className="error-div">
        <div className="error-img-div">
            <img className="error-img" src="/404.png" alt="Error 404" />
        </div>
      <h1 className="error-head">Error: {error.status}</h1>
      {error.status === 404 ? (<>
        <p className="error-p">The page you are looking for does not exist. </p>
        <p className="error-p">Redirecting you to home page in: {counter} secs</p>
        </>
      ) : (
        <p>An unexpected error has occurred.</p>
      )}
    </div>
  );
}

export default ErrorBoundary;
