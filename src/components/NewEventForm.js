import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
import { useNavigate } from "react-router-dom";

function NewEventForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [user] = useAtom(userAtom);
    const [attendees, setAttendees] = useState("");
    const [location, setLocation] = useState("");
    const [event_time, setEventTime] = useState("");
    const [event_date, setEventDate] = useState("");
    const [sport_id, setSportId] = useState("");
    const [sportOptions, setSportOptions] = useState([]);

    useEffect(() => {
        const fetchSportOptions = async () => {
            try {
                const response = await fetch("https://sportner-backend-a5fda8060658.herokuapp.com/sports");
                const data = await response.json();
                const options = data.sports.map(({ id, name }) => ({ value: id, label: name }));
                setSportOptions(options);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSportOptions();
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleAttendeesChange = (event) => {
        setAttendees(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleEventTimeChange = (event) => {
        setEventTime(event.target.value);
    };

    const handleEventDateChange = (event) => {
        setEventDate(event.target.value);
    };

    const handleSportIdChange = (event) => {
        setSportId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const now = new Date();
        if (new Date(event_date + " " + event_time) < now) {
            alert("La date de l'événement ne peut pas être antérieure à la date et heure actuelles");
            return;
        }

        const newEvent = {
            event: {
                event_name: title,
                description: content,
                user_id: user.user_id,
                attendees: attendees,
                location: location,
                event_time: event_time,
                event_date: event_date,
                sport_id: sport_id,
            },
        };

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://sportner-backend-a5fda8060658.herokuapp.com/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? token : user.token,
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                alert("L'event a été créé avec succès");
                navigate("/events");
            } else {
                navigate("/login");
                alert("Veuillez vous connecter pour créer une séance !");
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'event :", error);
        }
    };


    return (
        <div id='Cadre'>
            <h2 className='CreateEventTitle'>Propose une séance !</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        id="title"
                        value={title}
                        placeholder='Titre'
                        onChange={handleTitleChange} />
                </div>
                <div>
                    <input
                        id="content"
                        placeholder='Précisions'
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>
                <div>
                    <input
                        id="attendees"
                        placeholder='Nombre de places'
                        value={attendees}
                        onChange={handleAttendeesChange}
                    />
                </div>
                <div>
                    <input
                        id="location"
                        placeholder='Lieu de la séance'
                        value={location}
                        onChange={handleLocationChange}
                    />
                </div>
                <div>
                    <input
                        id="event_time"
                        type="time"
                        placeholder='Heure de la séance'
                        value={event_time}
                        onChange={handleEventTimeChange}
                    />
                </div>
                <div>
                    <input
                        id="event_date"
                        placeholder='date'
                        value={event_date}
                        onChange={handleEventDateChange}
                        type="date"
                        pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                    />

                </div>
                <div id="scroll-option">
                    <select id="sport_id" onChange={handleSportIdChange} value={sport_id}>
                        <option value="">Choisissez un sport</option>
                        {sportOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">PUBLIER</button>
            </form>
        </div>

    );
}

export default NewEventForm;