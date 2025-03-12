import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import Footer from "./components/Footer";

const defaultPhotoURL = "https://dummyimage.com/40x40/000/fff&text=User";

const App = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    nickname: "User",
    photoURL: defaultPhotoURL,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData({
            nickname: userSnap.data().nickname || "User",
            photoURL: userSnap.data().photoURL || defaultPhotoURL,
          });
        }
      } else {
        setUserData({ nickname: "User", photoURL: defaultPhotoURL });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/DkBot/" element={<Home />} />
          <Route path="/DkBot/projects" element={<Projects user={user} />} />
          <Route path="/DkBot/about" element={<About />} />
          <Route path="/DkBot/register" element={<Register />} />
          <Route path="/DkBot/login" element={<Login />} />
          <Route path="/DkBot/edit-profile" element={<EditProfile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;