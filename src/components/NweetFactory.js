import React, {useState} from "react";
import { dbSerive,storageService } from "fBase";
import { ref, uploadString,getDownloadURL } from "@firebase/storage";
import { addDoc, collection} from "firebase/firestore";
import { v4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

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
        <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt="이미지 미리보기"
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
    );
}

export default NweetFactory;