import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../store/Context';
import { getFirestore, collection, getDocs, orderBy, limit, query } from '@firebase/firestore';
import Heart from '../assets/Heart';
import './Posts.css';
import { PostContext } from '../store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { firebaseApp } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const db = getFirestore(firebaseApp);
  const { setPostDetails } = useContext(PostContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(5))
        );
        const allPosts = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id
        }));
        setProducts(allPosts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [db]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => {
                setPostDetails(product);
                Navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span> {product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.slice(0, 5).map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => {
                setPostDetails(product);
                Navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span> {product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
