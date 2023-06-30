import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      id: "",
      isLoggedIn: false,
      userData: null,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    navigate("/");
    window.location.reload();
  };

  return <button className="buttonLogout" onClick={handleLogout}>Déconnexion</button>;
}

export default Logout;
