import React, { useState } from "react";

const Home =  () => {
    const [nweet,setNweet] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
    }
    const onChange = (e) => {
        const {target : {value}} = e;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} type="text" maxLength="120" placeholder="what's on your mind?" onChange={onChange}/>
                <input type="submit" value="Nweet" />
            </form>
        </div>
    );
}
export default Home;