import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { dbSerive,storageService } from "fBase";
import { v4 } from 'uuid';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { ref, uploadString } from "@firebase/storage";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment,setAttachment] = useState();
    useEffect(() => {
        const q = query(collection(dbSerive, "Nweets"), orderBy("createAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            console.log(response);
            // const docRef = await addDoc(collection(dbSerive, "Nweets"), {
            //     text: nweet,
            //     createAt: Date.now(),
            //     creatorId: userObj.uid,
            // });
            //console.log(docRef.id);
        } catch (error) {
            console.log(error.message);
        }
        setNweet("");
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };
    //console.log(nweets);
    const onFileChange = (e) => {
        const {target : {files},} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" maxLength="120" placeholder="what's on your mind?" onChange={onChange} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet" />
                {
                attachment && 
                    (
                        <>
                            <div>
                                <img src={attachment} width="50px" height="50px" />
                                <button onClick={onClearAttachment}>Clear</button>
                            </div>
                        </>
                    )
                }
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;
