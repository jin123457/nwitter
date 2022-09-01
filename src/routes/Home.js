import { dbSerive } from "fBase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(dbSerive, "Nweets"), {
                nweet,
                createAt: Date.now(),
            });
            console.log(docRef);
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" maxLength="120" placeholder="what's on your mind?" onChange={onChange} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    );
};
export default Home;
