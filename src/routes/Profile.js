import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbSerive } from "fBase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";

const Profile = ({refreshUser, userObj}) => {
    const navigate = useNavigate();
    const [newDisplayName,setNewDisplayName] = useState(userObj.displayName);
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
    const onSubmit = async(e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(userObj,{
                displayName : newDisplayName
            });
        }
        refreshUser();
    }
    const onChange = (e) => {
        const {target : {value},} = e;
        setNewDisplayName(value);
    }
    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
            <input type="submit" value="Update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;