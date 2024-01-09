import React, { useEffect, useState } from "react";
import { Post as IPost } from "./main"; //import the Post interface
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  post: IPost; //props post should be the type of interface Post(IPost)
}

export const Post = (props: Props) => {
  const { post } = props; //destructure the props object and get the post inside it

  const [user] = useAuthState(auth); // this hook will authomatically update the user whenever the user logs in using differrenct account

  const [likeAmount, setLikeAmount] = useState<number | null>(null); // state to update the likes amount

  const likessRef = collection(db, "likes"); // get the data from the collection or table

  const likesDoc = query(likessRef, where("postid", "==", post.id)); // query the likes table and get the  data where post id is equal to the postid in the likes talble and assigned it to likes doc object

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikeAmount(data.docs.length); // set the likes amount
  };

  const addLike = async () => {
    await addDoc(likessRef, { userid: user?.uid, postid: post.id }); //pass the data to the table fields in firestore
    // adding  like data to the data to the firestore db likes table
  };
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post">
      <div className="user">
        <p>Posted By@{post.username}</p>
      </div>
      <div className="title">
        <h2 style={{ color: "black" }}>{post.title}</h2>
      </div>
      <div className="description">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <button onClick={addLike}>&#128077;</button>
        {likeAmount && <p style={{ color: "blue" }}>Likes: {likeAmount}</p>}
      </div>
    </div>
  );
};
