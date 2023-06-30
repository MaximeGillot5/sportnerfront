import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function SignupForm() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://sportner-backend-a5fda8060658.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: email,
              password: password,
              password_confirmation: passwordConfirmation,
              first_name: firstName,
              last_name: lastName,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = response.headers.get("Authorization");
        const userEmail = data.data.email;

        localStorage.setItem("token", token);
        localStorage.setItem("email", userEmail);

        setUser((prevUser) => ({
          ...prevUser,
          isLoggedIn: true,
          email: userEmail,
        }));
        navigate("/");
        window.location.reload();
      } else {
        alert("Erreur lors de la création du compte");
      }
    } catch (error) {
      alert("Erreur lors de la création du compte");
    }
  };

  return (
    <form id="register-form" class="my-form" onSubmit={handleSubmit}>
      <h2 id="register-title">Créer un compte</h2>
      {error && <p>{error}</p>}
      <div id="firstname-input">
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="Prénom"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          id="lastName"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div id="password-confirm-input">
        <input
          type="password"
          id="passwordConfirmation"
          placeholder="Confirme ton mot de passe"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
      </div>
      <button id="register-btn" type="submit">
        Créer un compte
      </button>
    </form>
  );
}

export default SignupForm;
