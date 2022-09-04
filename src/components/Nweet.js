import { dbSerive, storageService } from "fBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


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
        <div className="nweet">
        {editing ? (
            <>
            <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                type="text"
                placeholder="Edit your nweet"
                value={newNweet}
                required
                autoFocus
                onChange={onChange}
                className="formInput"
                />
                <input type="submit" value="Update Nweet" className="formBtn" />
            </form>
            <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
            </span>
            </>
        ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt={nweetObj.text} />}
            {isOwner && (
                <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </span>
                </div>
            )}
            </>
        )}
        </div>
    );
}

export default Nweet;