import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../FireBase/FireBase.init';
import { updateProfile } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();


export const AuthProvider = ({children}) => {
  const [user,setUser]= useState(null);
  const [loading, setLoading]= useState(true);

    const createUser = (email, password, name, photoURL) => {
  setLoading(true);


  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // ⭐ Update user profile AFTER account is created
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    });
};


    const signInUser =(email,password)=>{
        setLoading(true)
 return signInWithEmailAndPassword(auth,email,password)
    }

const signInWithGoogle =()=>{
 setLoading(true)
  return signInWithPopup(auth,googleProvider)
}

const signOutWithGoogle =()=>{
  setLoading(true)
return signOut(auth)

}


useEffect(()=>{
     const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
       setUser(currentUser)
       setLoading(false);
     })
 return ()=>{
    unsubcribe()
 }

},[])
    const authInfo ={
        createUser,
        signInUser,
        loading,
       user,
       signInWithGoogle,
       signOutWithGoogle
    }



  return (
   <AuthContext.Provider value={authInfo}>
      {children}
   </AuthContext.Provider>
  )
}
