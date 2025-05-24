import styles from "@/styles/login.module.css";

export default function Login() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles['login-field']}>
          <h1 className={styles.title}>Login</h1>

          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />

          <button className={styles.button}>Entrar</button>
        </div>
      </div>
    </>
  );
}