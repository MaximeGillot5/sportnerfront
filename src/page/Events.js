import React from 'react';
import EventsList from '../components/EventsList';
import { useNavigate } from "react-router-dom";
import '../styles/Events.css';


const Events = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="buttonToCreate">
        <h1>Tu veux créer ta séance et inviter d'autres sportifs ?</h1>
        <button onClick={() => navigate('/events/create')}>Déposer une annonce</button>
      </div>
      <EventsList />
    </div>
  );
};

export default Events;