import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Context, {FirebaseContext} from './store/Context';
import firebaseApp from './firebase/config';



const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebaseApp}} >
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);