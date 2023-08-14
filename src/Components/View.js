import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './View.css';
import { PostContext } from '../store/PostContext';
import { FirebaseContext } from '../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = React.useContext(PostContext); // Update the import and usage of useContext
  const { firebaseApp } = React.useContext(FirebaseContext); // Update the import and usage of useContext
  const db = getFirestore(firebaseApp);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const q = query(collection(db, 'users'), where('id', '==', postDetails.userId));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        if (userData.length > 0) {
          setUserDetails(userData[0]);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    

    fetchUserDetails();
  }, [db, postDetails.userId, userDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name} </span>
          <p>{postDetails.category} </p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails && (
            <>
              <p> {userDetails.username} </p>
              <p> {userDetails.phone} </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
