import React, { useEffect, useRef, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import "./Feed.css";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import Post from "./Post";
import { db } from "./firebase.config";
import {
  doc,
  onSnapshot,
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Feed() {
  const user = useSelector(selectUser);
  const input = useRef();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    // getdoc를 이용해서 post 를 firebase에서 가져오기
    // getPosts();
  }, []);
  // getdoc를 이용해서 post 를 firebase에서 가져오기
  // const getPosts = async () => {
  //   const docRef = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  //   const docSnap = await getDocs(docRef);
  //   let posts = [];
  //   docSnap.forEach((doc) =>
  //     posts.push({
  //       id: doc.id,
  //       data: doc.data(),
  //     })
  //   );

  //   setPosts(posts);
  // };

  // console.log(posts);

  const sendPost = (e) => {
    e.preventDefault();
    const inputRef = input.current.value;

    addDoc(collection(db, "posts"), {
      timestamp: serverTimestamp(),
      name: user.displayName,
      description: user.email,
      message: inputRef,
      photoUrl: user.photoUrl || "",
    });

    input.current.value = "";
    // getPosts();
  };

  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form onSubmit={sendPost}>
            <input
              type="text"
              // value={input}
              ref={input}
              // onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#7085f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0BCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      {/* Post */}
      {/* <FlipMove> */}
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
      {/* <Post
        name="kang mh"
        desctiption="This is a test"
        message="wow this worked"
      /> */}
    </div>
  );
}

export default Feed;
