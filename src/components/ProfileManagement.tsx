import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

const ProfileManagement = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get<UserProfile>('http://localhost:8080/api/v1/users/profile', {
          headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobXRydW5nIiwiZXhwIjoxNjk2ODY4MTExfQ.VbGV-jnsi8LDLbK3QsEoybLBiJ0Y88agtyVEzbHSvB-JlXNPQJtR4ypTSpuEsxo431d2nFL1ri6jKZwOskbgVw'
          }
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedProfile(userProfile);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile(null);
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
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (editedProfile?.userName && editedProfile?.email && editedProfile?.firstName && editedProfile?.lastName && editedProfile?.avatarUrl) {
        setIsEditing(false);
        const response = await axios.put<UserProfile>('http://localhost:8080/api/v1/users/profile', editedProfile, {
          headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobXRydW5nIiwiZXhwIjoxNjk2ODY4MTExfQ.VbGV-jnsi8LDLbK3QsEoybLBiJ0Y88agtyVEzbHSvB-JlXNPQJtR4ypTSpuEsxo431d2nFL1ri6jKZwOskbgVw'
          }
        });
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                      <img src={previewUrl} alt="Preview" />
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
              <img src={userProfile.avatarUrl} alt="User Avatar" />
              <button type="button" onClick={handleEditProfile}>Edit Profile</button>
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