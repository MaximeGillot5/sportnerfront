import React, { useState } from 'react';
import '../styles/PasswordReset.css';
import { useNavigate } from 'react-router-dom';


const PasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [requestStatus, setRequestStatus] = useState('pending');

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://sportner-backend-a5fda8060658.herokuapp.com/passwords/forgot?email=${email}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          setRequestStatus('success');
        } else {
          response.text().then(text => {
            if (text === '') {
              setRequestStatus('not-found');
            } else {
              setRequestStatus('error');
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('error');
      });
  }


  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function renderMessage() {
    switch (requestStatus) {
      case 'success':
        return (
          <div className='requestResponse'>
            <div>
              Ta demande de réinitialisation de mot de passe a bien été envoyée ! ✅
            </div>
            <a className="redirect" onClick={() => navigate('/passwords/reset')}>Tu peux le modifier ici !</a>
          </div>
        );
      case 'not-found':
        return (
          <div className='requestResponse'>
            Une erreur s'est produite pendant la demande. ❌
            <button onClick={() => setRequestStatus('pending')}>Réessayer</button>
          </div>
        );
      case 'error':
        return (
          <div className='requestResponse'>
            Cette adresse n'est pas enregistrée, rejoins-nous ! 👟
            <button onClick={() => navigate('/login')}>S'inscrire</button>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div id='input-mail'>
      <form onSubmit={handleSubmit}>
        <h1>Mot de passe oublié ? Donne-nous ton adresse email d'inscription et on s'occupe du reste !</h1>
        {requestStatus === 'pending' && (
          <label>
            Adresse email :
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
        )}
        <button id='button-lost' type='submit' disabled={requestStatus !== 'pending' || !email}>
          Réinitialiser le mot de passe
        </button>
        {renderMessage()}
      </form>
    </div>
  );
};

export default PasswordReset;
