import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from './Header';
import { AuthContext, FirebaseContext } from '../store/Context';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const { firebaseApp } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const storage = getStorage(firebaseApp);
  const db = getFirestore(firebaseApp);
  const date = new Date();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (image) {
      const storageRef = ref(storage, `/image/${image.name}`);
      uploadBytes(storageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            addDoc(collection(db, 'products'), {
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString( )
            })
            navigate('/');
          });
        });
    } else {
      console.log('No image selected');
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            id="fname" 
            name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
