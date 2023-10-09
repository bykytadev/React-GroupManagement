import React, { useState, useEffect } from 'react';
import axios from 'axios';
import http from 'services/axiosClient';
import styles from 'ProfileManagement.module.scss'

interface UserProfile {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

const ProfileManagement = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: ''
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  console.log(editedProfile.avatarUrl);
  const getUserProfile = async () => {
    http.get('/users/profile')
      .then(response => {
        setUserProfile(response.data);
      }
      )
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUserProfile()
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedProfile(userProfile);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile({
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      avatarUrl: ''
    });
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader: any = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        setEditedProfile(prev => ({
          ...prev,
          avatarUrl: reader.result.split('base64,')[1]
        }))
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    http.put('/users/profile', editedProfile)
      .then(response => {
        setUserProfile(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      {userProfile ? (
        <div>
          {isEditing ? (
            <div>
              <h2>Edit Profile</h2>
              <form>
                <div>
                  <label htmlFor="userName">Username:</label>
                  <input type="text" id="userName" name="userName" value={editedProfile?.userName} onChange={handleProfileChange} />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={editedProfile?.email} onChange={handleProfileChange} />
                </div>
                <div>
                  <label htmlFor="firstName">First Name:</label>
                  <input type="text" id="firstName" name="firstName" value={editedProfile?.firstName} onChange={handleProfileChange} />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name:</label>
                  <input type="text" id="lastName" name="lastName" value={editedProfile?.lastName} onChange={handleProfileChange} />
                </div>
                <div>
                  <label htmlFor="avatarUrl">Avatar URL:</label>
                  <input type="text" id="avatarUrl" name="avatarUrl" value={editedProfile?.avatarUrl} onChange={handleProfileChange} />
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={handleFileInputChange} />
                  {previewUrl && (
                    <div>
                      <img src={previewUrl} alt="Preview" style={{ verticalAlign: 'middle', width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                  )}
                </div>
                <div>
                  <button type="button" onClick={handleSaveProfile}>Save</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h2>{userProfile.userName}</h2>
              <p>{userProfile.email}</p>
              <p>{userProfile.firstName} {userProfile.lastName}</p>
              <img src={userProfile.avatarUrl} alt="User Avatar" style={{ verticalAlign: 'middle', width: '150px', height: '150px', borderRadius: '50%' }} />
              <p><button type="button" onClick={handleEditProfile}>Edit Profile</button></p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default ProfileManagement;