import React, { useEffect, useState } from 'react';
import '../styles/Sports.css'

const Sports = () => {
  const [sportName, setSportName] = useState([]);
  const [sportPic, setSportPic] = useState([]);

  useEffect(() => {
    fetch('https://sportner-backend-a5fda8060658.herokuapp.com/sports')
      .then((response) => response.json())
      .then((data) => {
        const names = data.sports.map((sport) => sport.name);
        const pics = data.sports.map((sport) => sport.sport_url);
        setSportName(names);
        setSportPic(pics);
      });
  }, []);


  return (
    <div id='sportsPage'>
      <div className='sportsMessage'>
        <h1>Ton sport favori ne figure pas dans la liste ? Tu souhaites pouvoir le proposer sur Sportner ?</h1>
        <button id='buttonToContact'><a href='/about'>Contacte-nous !</a></button>
      </div>
      <div className='cardsContainer'>
        {sportName.map((name, index) => (
          <div className="sportCard" key={index}>
            <h3>{name}</h3>
            <img src={sportPic[index]} alt={name} />
          </div>
        ))}
      </div>
    </div>
  );

};

export default Sports;
