import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNavigation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "admin" && password === "test") {
      navigate("/home");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-page__card" onSubmit={handleNavigation}>
        <h2 className="auth-page__title">Hello from login page</h2>

        <div className="auth-page__fields">
          <div className="auth-page__field">
            <label className="auth-page__label">Username:</label>
            <input
              className="auth-page__input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="auth-page__field">
            <label className="auth-page__label">Password:</label>
            <input
              className="auth-page__input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <p className="auth-page__hint">Prueba con admin / test.</p>

        <button className="auth-page__button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
};
