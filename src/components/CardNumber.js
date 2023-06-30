import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const CardNumber = () => {
  return (
    <div>
      <h1 id='sportsnumber'>20+</h1>
      <h2 id='sportstext'>Déjà plus de 20 sports disponibles</h2>
      <a href='/about' id='btn-more' role="button" className="btn glass">En savoir plus</a>
    </div>

  );
};

export default CardNumber;