import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
import { useNavigate } from "react-router-dom";

const ButtonJoin = ({ eventId }) => {
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();
    const [participationsCount, setParticipationsCount] = useState(0);
    const [attendeesCount, setAttendeesCount] = useState("");

    const handleJoin = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            alert("Veuillez vous connecter pour participer à une séance !");
            return;
        }

        const participationData = {
            user_id: localStorage.getItem("id"),
        };

        axios
            .post(
                `https://sportner-backend-a5fda8060658.herokuapp.com/events/${eventId}/participations`,
                participationData,
                {
                    headers: {
                        Authorization: token ? token : "",
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        axios.get(`https://sportner-backend-a5fda8060658.herokuapp.com/events/${eventId}`)
            .then((response) => {
                setParticipationsCount(response.data.participants.length);
                setAttendeesCount(response.data.event.attendees);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [eventId]);


    if (participationsCount < attendeesCount) {
        return (
            <div id="buttonContainer">
                <button id="buttonParticipation" onClick={handleJoin}>
                    Participer
                </button>
            </div>
        );
    } else {
        return null;
    }
};

export default ButtonJoin;
