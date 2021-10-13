import React from "react";
// import { PostPageContainer } from "./post-page-styles";
import { useHistory } from "react-router-dom";
import Linkify from "react-linkify";
import { Box } from "@mui/system";
import world from "../shared/images/logo.svg";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  worldFooter: {
    height: "5rem",
  },
});

const PostPage = (props) => {
  const history = useHistory();
  const postDetails = history.location.state;
  const classes = useStyles();

  console.log("PostPage props", postDetails);
  return (
    <Box>
      <div className="post-image-section-container">
        {/* <h1>{postDetails.postURLs[1]}</h1> */}

        <div
          className={`post-image-container ${
            postDetails.postURLs[1] && "undashed"
          }`}
        >
          <img
            className="postImage"
            src={postDetails.postURLs[1]}
            alt="Youre probably not online"
          />
        </div>
        <div
          className={`post-image-container ${
            postDetails.postURLs[2] && "undashed"
          }`}
        >
          <img className="postImage" src={postDetails.postURLs[2]} />
        </div>
      </div>
      <div className="post-section-container">
        <h1>{postDetails.title}</h1>
        <Linkify>
          <div className="post-content">{postDetails.content}</div>
        </Linkify>
        <img src={world} alt="logo" className={classes.worldFooter} />
      </div>
    </Box>
  );
};

export default PostPage;
