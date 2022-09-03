import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { dbSerive } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
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
    
    return (
        <div>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
};
export default Home;
