import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import domain from "../../util/domain";
const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      console.log("getPosts Initiated");
      let getPostsRes = await axios.get(`${domain}/posts`);
      console.log("getPosts response", getPostsRes.data);
      setPosts(getPostsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createPost = async (formData) => {
    console.log("---createPost Initiated---");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post("http://localhost:5000/posts", formData, config)
      .then((res) => console.log("axios res", res))
      .catch((err) => console.log("axios err", err));
    getPosts();
  };

  const updatePost = async (data, input, index) => {
    console.log("---updatePost Initiated---");
    const editPostId = data.id;
    var formData = new FormData();
    const dataFunction = async () => {
      formData.append("title", input.title);
      formData.append("caption", input.caption);
    };
    await dataFunction();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const editPostRes = await axios.put(
      `${domain}/posts/${editPostId}`,
      formData,
      config
    );
    getPosts();
  };

  const getUsersPosts = async () => {
    try {
      console.log("----getUsersPosts Initiated----");
      const getUsersPostsRes = await axios.get(`${domain}/posts/user`);
      console.log("getUsersPosts response", getUsersPostsRes.data);
      setUsersPosts(getUsersPostsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        getPosts,
        createPost,
        updatePost,
        getUsersPosts,
        usersPosts,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
export { PostContextProvider };
