import { dbSerive } from "fBase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const q = query(collection(dbSerive, "Nweets"), orderBy("createAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(nweetArr);
            console.log(nweetArr);
        });
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbSerive, "Nweets"), {
                text: nweet,
                createAt: Date.now(),
                creatorId: userObj.uid,
            });
            console.log(docRef.id);
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" maxLength="120" placeholder="what's on your mind?" onChange={onChange} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;
