import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://sportner-backend-a5fda8060658.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: email,
              password: password,
            },
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const token = response.headers.get("Authorization");
        const email = responseData.data.email;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);

        setUser((prevUser) => ({
          ...prevUser,
          isLoggedIn: true,
          email: email,
        }));

        navigate("/");
        window.location.reload();
      } else {
        alert("Identifiants invalides");
      }
    } catch (error) {
      alert("Une erreur s'est produite");
    }
  };

  return (
    <div id="login" className="form-container">
      <form onSubmit={handleLogin}>
        <h2 id="text-login">Se connecter</h2>
        {error && <p>{error}</p>}
        <div id="email-div">
          <label id="email-label" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div id="password-div">
          <label id="password-label" htmlFor="password">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="forgot-link">
          <a onClick={() => navigate("/passwords/lost")}>
            Mot de passe oublié ?
          </a>
        </div>
        <button id="btn-login" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
