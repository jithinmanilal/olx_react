import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../assets/OlxLogo';
import Search from '../assets/Search';
import Arrow from '../assets/Arrow';
import SellButton from '../assets/SellButton';
import SellButtonPlus from '../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../store/Context';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function Header() {
  const { user } = useContext(AuthContext);
  const { firebaseApp } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">
            <OlxLogo></OlxLogo>
          </Link>

        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span>{user.displayName}</span>
          ) : (
            <span onClick={handleLoginClick}>Login</span>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout}>Logout</span>
        )}
        <div className="sellMenu">
        {user ? (
          <Link to="/create">
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </Link>
        ) : (
          <Link to="/login">
          <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>Sell</span>
            </div>
          </Link>
        )}
      </div>
      </div>
    </div>
  );
}

export default Header;
