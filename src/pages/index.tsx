import Header from "@/components/header/header";
import Login from "@/pages/login";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const verifyUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  };

  useEffect(() => {
    verifyUser();
  }, [isLogged]);

  return <>{isLogged ? <Header /> : <Login />}</>;
}
