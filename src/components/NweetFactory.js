import React,{useState}from "react";
import { dbSerive,storageService } from "fBase";
import { ref, uploadString,getDownloadURL } from "@firebase/storage";
import { addDoc, collection} from "firebase/firestore";
import { v4 } from 'uuid';

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment,setAttachment] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let attachmentUrl = "";
            if(attachment !== ""){
                const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
                const response = await uploadString(fileRef, attachment, "data_url");
                attachmentUrl = await getDownloadURL(response.ref);
            }
            await addDoc(collection(dbSerive, "Nweets"), {
                text: nweet,
                createAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl
            });
            console.log(attachmentUrl);
        } catch (error) {
            console.log(error.message);
        }
        setNweet("");
        setAttachment("");
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
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit}>
            <input value={nweet} type="text" maxLength="120" placeholder="what's on your mind?" onChange={onChange} />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet" />
            {
            attachment && 
                (
                    <>
                        <div>
                            <img src={attachment} width="50px" height="50px" alt="이미지 미리보기" />
                            <button onClick={onClearAttachment}>Clear</button>
                        </div>
                    </>
                )
            }
        </form>
    );
}

export default NweetFactory;