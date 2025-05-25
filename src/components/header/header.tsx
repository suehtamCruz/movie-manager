import styles from "./header.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    window.dispatchEvent(new Event("storage"));

    toast.success("Logout realizado com sucesso!", {
      autoClose: 5000,
    });

    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <Link
          href="/movies"
          style={{
            cursor: "pointer",
            color: "black",
            textDecoration: "none",
          }}
        >
          Filmes
        </Link>

        <FontAwesomeIcon
          icon={faRightFromBracket}
          onClick={handleLogout}
          className={styles.button}
        /> 
      </div>
    </header>
  );
}
