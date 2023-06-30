import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atom';

const MyEvents = () => {
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useState('');
  const [eventNames, setEventNames] = useState([]);
  const [eventPlace, setEventPlace] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [participationId, setParticipationId] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');

    if (token && storedEmail) {
      fetch('https://sportner-backend-a5fda8060658.herokuapp.com/current_user', {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserId(data.id);
          setUser({
            ...data,
            isLoggedIn: true,
            email: storedEmail,
          });

          fetch(`https://sportner-backend-a5fda8060658.herokuapp.com/users/${data.id}`)
            .then((response) => response.json())
            .then((data) => {
              const events = data.events;
              const participations = data.participations
              const names = events.map(event => event.event_name);
              const places = events.map(event => event.location);
              const dates = events.map(event => event.event_date);
              const participationsId = participations.map(participation => participation.event_id)
              setEventNames(names);
              setEventPlace(places);
              setEventDate(dates);
              setParticipationId(participationsId);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du prénom :', error);
        });
    }

    if (!token && !storedEmail && user.isLoggedIn) {
      localStorage.removeItem('email');
    }
  }, [setUser, user.isLoggedIn]);

  return (
    <div>
      <div id='Cadre'>
        <h1>Mes évènements :</h1>
        {eventNames.length > 0 ? (
          eventNames.map((eventName, index) => (
            <div id='myEvent' key={index}>
              <p>
                {eventName} {eventPlace[index]} {eventDate[index]}
              </p>
            </div>
          ))
        ) : (
          <p>Propose ta première séance !</p>
        )}
      </div>
      <div id='Cadre'>
        <h1>Mes participations :</h1>
        {participationId.length > 0 ? (
          participationId.map((participation, index) => (
            <div id='myEvent' key={index}>
              <p>
                {participation}
              </p>
            </div>
          ))
        ) : (
          <p>Inscris toi à ton premier évènement !</p>
        )}
      </div>
    </div>
  );


};

export default MyEvents;
