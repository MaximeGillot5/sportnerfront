import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../App.css";
import { BrowserRouter as Router} from 'react-router-dom';
import Logout from "./Logout";

function Navbar() {
    const navRef = useRef();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [storedEmail, setStoredEmail] = useState(localStorage.getItem('email'));

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setStoredEmail(localStorage.getItem('email'));
    }, []);
    function handleDivClick() {
        window.location.href = '/';
    }

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
        if (typeof document !== 'undefined') {
            document.body.classList.toggle("nav-open");
        }
    };
    return (
        <Router>
            <header id="navbar">
                <div id="BigTitle" onClick={handleDivClick}>
                    <h3>SPORT<span id="text-orange">NER</span></h3>
                </div>
                <nav id='links' ref={navRef}>
                    <div className="links">
                        <a href="/">Accueil</a>
                        <a href="/events">évenements</a>
                        <a href="/sports">Sports</a>
                        <a href="/about">Contact</a>
                        {token && storedEmail ? <a href="/account">Profil</a> : <a href="/login">Connexion</a>}
                        {token && storedEmail ? <Logout/> : null }
                    </div>
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}
                    >
                        <FaTimes />
                    </button>
                </nav>
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </header>
        </Router>

    );
}

export default Navbar;
