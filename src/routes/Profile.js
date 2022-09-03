import { authService, dbSerive } from "fBase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({userObj}) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    }
    const getMyNweets= async() => {
        const nweets = query(collection(dbSerive,"Nweets"),where("creatorId", "==",userObj.uid),orderBy("createdAt","desc"));
        const querySnapshot = await getDocs(nweets);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }
    useEffect(()=>{
        getMyNweets();
    },[]);
    return (
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;