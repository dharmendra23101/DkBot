import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css"; // Import the CSS file

const defaultPhotoURL = "https://dummyimage.com/40x40/000/fff&text=User";

const EditProfile = () => {
  const [nickname, setNickname] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("No user logged in!");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await updateDoc(userRef, {
          nickname: nickname || userSnap.data().nickname,
          photoURL: photoURL || userSnap.data().photoURL,
        });
      } else {
        await setDoc(userRef, {
          nickname: nickname || "User",
          photoURL: photoURL || defaultPhotoURL,
          email: user.email,
        });
      }

      alert("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Enter Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photoURL">Profile Image URL</label>
          <input
            type="text"
            id="photoURL"
            name="photoURL"
            placeholder="Enter Image URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;