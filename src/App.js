import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';

function App() {
  const { setUser } = useContext(AuthContext); // Use useContext with AuthContext
  const { firebaseApp } = useContext(FirebaseContext);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Pass the user object directly to setUser
    });

    return () => {
      unsubscribe(); // Unsubscribe from the onAuthStateChanged listener
    };
  }, [auth, setUser]);

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
