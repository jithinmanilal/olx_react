import React, { useState, useContext } from 'react';
import Logo from '../olx-logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { FirebaseContext } from '../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { firebaseApp } = useContext(FirebaseContext);
  const db = getFirestore(firebaseApp);
  console.log(db);

  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset the error state

    // Form validation
    if (!username || !email || !phone || !password) {
      setError('Please fill in all fields');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: username })
          .then(() => {
            addDoc(collection(db, 'users'), {
              id: result.user.uid,
              username: username,
              phone: phone
            })
              .then(() => {
                navigate('/login');
              })
              .catch((error) => {
                setError('Error creating user. Please try again later.');
              });
          })
          .catch((error) => {
            setError('Error updating profile. Please try again later.');
          });
      })
      .catch((error) => {
        setError('Error creating user. Please try again later.');
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder="Enter your username"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            placeholder="Enter your phone number"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            placeholder="Enter your password"
          />
          <br />
          {error && <p className="error">{error}</p>}
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
}
