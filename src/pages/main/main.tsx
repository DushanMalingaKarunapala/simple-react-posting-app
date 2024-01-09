import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
  id: string;
  userid: string;
  title: string;
  username: string;
  description: string;
} //interface which defines how a post looks like

export const Main = () => {
  const [postslist, setPostLists] = useState<Post[] | null>(null); // a state to keep track of the data we get back from the database

  const postsRef = collection(db, "posts"); // referece to the database in which table r collection you want to get the data from

  const getPosts = async () => {
    const data = await getDocs(postsRef); // get the data from the database using getdocs function and pass the postRef object to it. which has the database object and the table name which is "posts"
    setPostLists(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    ); //destructure the data we get back from the firebase and get only the data we want
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="homepage">
      {postslist?.map(
        (
          post //looping through the post list and returining each post
        ) => (
          <Post post={post} /> //paass the props to the  Post component to render the data in it
        )
      )}
    </div>
  );
};
