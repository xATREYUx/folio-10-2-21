import React, { useContext, useEffect, useState } from "react";
// import { Column } from "../shared/shared.styles";
// import { UserPageContainer } from "./user-page-styles";
import { Grid, Paper } from "@mui/material";
import PostForm from "../components/posts/postForm";
import PostList from "../components/posts/postList";
import PostContext from "../components/posts/postContext";
import AuthContext from "../components/auth/authContext";
// import EnterUserAdmin from "../components/admin/MakeUserAdmin";

import { getAuth } from "firebase/auth";
import { Box } from "@mui/system";

const UserPage = () => {
  const { getUsersPosts, usersPosts, posts } = useContext(PostContext);
  const { getLoggedIn, loggedIn, CheckAdmin } = useContext(AuthContext);

  const [editPostData, setEditPostData] = useState("");

  useEffect(() => {
    getUsersPosts();
  }, []);

  console.log("UserPage: ", usersPosts);
  return (
    <Box>
      <Grid container>
        <Grid item item xs={12} md={6}>
          {/* <div>{loggedIn.user.email}</div> */}
          <PostList title={""} posts={posts} dataLimit={6} pageLimit={4} />
        </Grid>
        <Grid item align="center" item xs={12} md={6}>
          <PostForm
            editPostData={editPostData}
            setEditPostData={setEditPostData}
          />
          {/* <div>
            <CheckAdmin />
          </div> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPage;
