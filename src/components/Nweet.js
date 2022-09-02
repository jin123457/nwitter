import { async } from "@firebase/util";
import { dbSerive, storageService } from "fBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, { useState } from "react";


const Nweet = ({nweetObj,isOwner}) => {
    const [editing,setEditing] = useState(false);
    const [newNweet,setNewNweet] = useState(nweetObj.text);
    const NweetTextRef = doc(dbSerive, "Nweets", `${nweetObj.id}`);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            // delete 부분
            await deleteDoc(NweetTextRef);
            const deleteObjURL = ref(storageService, nweetObj.attachmentUrl);
            await deleteObject(deleteObjURL);
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(e) => {
        e.preventDefault();
        //update 부분
        await updateDoc(NweetTextRef, {
            text: newNweet,
        });
        setEditing(false);
        
    }
    const onChange = (e) => {
        const {target : {value},} = e;
        setNewNweet(value);
    }
    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Edit your nweet?" value={newNweet} onChange={onChange}/>
                            <input value="update nweet" type="submit" />
                        </form>
                        <button onClick={toggleEditing}>cancle</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {
                            nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                        }
                        {
                        isOwner && 
                            (
                                <>
                                    <button onClick={onDeleteClick}>Delete nweet</button>
                                    <button onClick={toggleEditing}>Edit nweet</button>
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    );
}

export default Nweet;