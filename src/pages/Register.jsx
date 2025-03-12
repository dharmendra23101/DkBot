import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; // Import the CSS file

const defaultPhotoURL = "https://dummyimage.com/40x40/000/fff&text=User";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const profilePic = photoURL || defaultPhotoURL;

      await updateProfile(user, { displayName: nickname, photoURL: profilePic });

      await setDoc(doc(db, "users", user.uid), {
        nickname,
        photoURL: profilePic,
        email: user.email, // Store email for consistency
      });

      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="photoURL">Profile Picture URL (Optional)</label>
          <input
            type="text"
            id="photoURL"
            name="photoURL"
            placeholder="Enter image URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;