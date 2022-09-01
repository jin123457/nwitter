import { dbSerive } from "fBase";
import { addDoc, collection, query, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async () => {
        const dbnweets = query(collection(dbSerive, "Nweets"));
        const querySnapshot = await getDocs(dbnweets);
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            };
            setNweets((prev) => [nweetObj, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbSerive, "Nweets"), {
                nweet,
                createAt: Date.now(),
            });
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
    console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" maxLength="120" placeholder="what's on your mind?" onChange={onChange} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;
