import { AuthService } from "@/services/auth.service";
import styles from "@/styles/login.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const authService = new AuthService();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/movies");
    }
  }, [router]);

  const handleLogin = async () => {
    await authService
      .login(username, password)
      .then(
        (resp: {
          user: { id: number; name: string };
          access_token: string;
        }) => {
          localStorage.setItem("user", JSON.stringify(resp.user));
          localStorage.setItem("access_token", resp.access_token);

          window.dispatchEvent(new Event("storage"));

          toast.success("Login realizado com sucesso!", {
            autoClose: 5000,
          });

          router.push("/movies");
        }
      );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["login-field"]}>
          <h1 className={styles.title}>Login</h1>

          <input
            type="text"
            placeholder="Usuário"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={styles.button} onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}
