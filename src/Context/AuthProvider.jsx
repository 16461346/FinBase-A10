import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user,setUser]=useState(null);
const [loading, setLoading] = useState(true); 

  const creatUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser=(name, image)=>{
    return updateProfile(auth.currentUser,{
      displayName:name,
      photoURL:image,
    })
  }

  const loginUser=(email,password)=>{
    return signInWithEmailAndPassword (auth,email,password);
  }

  const logOutUser=()=>{
    return signOut(auth);
  }

  const loginWithGoogle=()=>{
    return signInWithPopup(auth,provider)
  }

  const passwordReset=(email)=>{
    return sendPasswordResetEmail(auth,email)
  }

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
      setLoading(false);

    })
    return ()=>{
      unsubscribe();
    }
  },[]);

  const authInfo = {
    updateUser,
    passwordReset,
    loginWithGoogle,
    logOutUser,
    creatUser,
    loginUser,
    user,
    loading,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
