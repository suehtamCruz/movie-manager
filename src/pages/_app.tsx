import Header from "@/components/header/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./login";

export default function App({ Component, pageProps }: AppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = () => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener("storage", checkAuth);

    const interval = setInterval(() => {
      checkAuth();
    }, 500);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);
  
  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
      <ToastContainer />
    </>
  );
}
