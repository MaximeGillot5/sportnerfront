import React, { useState } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import MyProfile from '../components/MyProfile';
import MyEvents from '../components/MyEvents';
import '../styles/UserAccount.css';

const UserAccount = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div id='ProfilePage'>
      {!isEditing && (
        <>
          <MyProfile />
          <div className='button'>
            <button onClick={handleEditClick}>Modifier le profil</button>
          </div>
          <MyEvents/>
        </>
      )}
      {isEditing && (
        <>
          <EditProfileForm />
          <div className='button'>
            <button  onClick={handleEditClick}>Retour au profil</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAccount;
