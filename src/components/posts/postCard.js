import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useHistory } from "react-router";
// import { CardContainer, PostButtonsContainer } from "./posts.styles";
// import { Column } from "../../shared/shared.styles";
import AuthContext from "../auth/authContext";
// import PostButtons from "./PostButtons";

const PostCard = ({ post }) => {
  console.log("PostListCard Initiated: ", post);
  const history = useHistory();
  const { loggedIn } = useContext(AuthContext);

  return (
    <Card
      sx={{
        width: "250px",
        height: "250px",
      }}
      // md={{ maxWidth: "40vw", marginY: 5 }}
      // lg={{ maxWidth: "40vw", marginY: 5 }}
      onClick={() => {
        console.log("post clicked!!");
        history.push(`/post/${post.id}`, post);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="150px"
          image={post.postURLs[0]}
          alt="You're probably not online"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.caption}
          </Typography>
        </CardContent>
        {/* <Grid
            style={{ flex: 1 }}
            onClick={() => {
              console.log("post clicked!!");
              history.push(`/post/${post.id}`, post);
            }}
          >
            <img
              id="postImageOne"
              alt="Youre probably not online"
              src={post.postURLs[0]}
            />
          </Grid>
          <Grid style={{ flex: 1 }}>
            <h3
              onClick={() => {
                console.log("post clicked!!");
                history.push(`/post/${post.id}`, post);
              }}
            >
              {post.title}
            </h3>
            <div>{post.caption}</div>
            {/* <PostButtonsContainer className="postButtons">
            {post.creator === loggedIn.user.uid && (
              <PostButtons post={post} setEditPostData={setEditPostData} />
            )}
          </PostButtonsContainer> */}

        {/* </Grid> */}
      </CardActionArea>
    </Card>
  );
};
export default PostCard;
