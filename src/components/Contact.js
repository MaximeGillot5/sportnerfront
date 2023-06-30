import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const formMess = document.querySelector(".form-message");

        emailjs.sendForm('service_3fs5cnc', 'template_hsmdtv6', form.current, process.env.REACT_APP_API_KEY)
            .then((result) => {
                console.log(result.text);
                form.current.reset();
                formMess.innerHTML = "<p className='success'>Message envoyé !</p>";

                setTimeout(() => {
                    formMess.innerHTML = "";
                }, 2500);

            }, (error) => {
                console.log(error.text);
                formMess.innerHTML = "<p className='error'>Veuillez réessayer ! </p>";

                setTimeout(() => {
                    formMess.innerHTML = "";
                }, 4000);

            });
    };

    return (
        <div id='form' className="form-container">
            <form ref={form} onSubmit={sendEmail}>
                <h3 id='contact-text'>Des suggestions ? Contactez-nous !</h3>
                <label>Nom</label>
                <input id='name' type="text" name="name" required autoComplete='off' />
                <label>Email</label>
                <input id='email' type="email" name="email" required autoComplete='off' />
                <label>Message</label>
                <textarea id='message' name="message" required />
                <input className='button' type="submit" value="Envoyer" />
            </form>
            <div className="form-message"></div>
        </div>
    );
};

export default Contact;