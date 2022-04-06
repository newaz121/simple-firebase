
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth(app)


function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
      })
      .catch(error => {
        console.error(error);
      })
  }

  const handlesignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handlesignOut}>Sign Out</button> :
          <>
            <button onClick={handleGoogleIn}>Sign In</button>
            <button onClick={handleGithubSignIn}>Github sign In</button>
          </>

      }
      <h2>Name:{user.displayName}</h2>
      <p>I konow your email addres:{user.email}</p>
      <img src={user.photoURL} alt="" />

    </div>
  );
}

export default App;
