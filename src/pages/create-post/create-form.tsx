import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; // this helps to merge both eact-form and yup libraries
import { addDoc, collection } from "firebase/firestore"; // these functions used to add new data entry to the firestore database
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface createFormData {
  title: string;
  description: string;
}

export const CreatForm = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  //creating the form using react form
  const schema = yup.object().shape({
    // creating the validations using yup
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFormData>({
    //register the
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: createFormData) => {
    console.log(data);
    await addDoc(postsRef, {
      // adding the data to the firestore db
      //..data,

      title: data.title, //you can use spread operator to create the new object using previous object using this ...data,
      description: data.description,
      username: user?.displayName,
      userid: user?.uid,
    });
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title" {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea placeholder="Description" {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};
