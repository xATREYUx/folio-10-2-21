import { useState, useContext, useEffect } from "react";
// import { FormContainer } from "./posts.styles";
import ImageUpload from "../form-elements/ImageUpload";
import PostContext from "./postContext";
import { appendErrors, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

// import { createPost } from "./postActions";

const useStyles = makeStyles({
  textInput: {
    marginBottom: "3px",
  },
  formContainer: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    margin: "1rem",
  },
  postButton: {
    width: "250px",
  },
});

const PostForm = (props) => {
  const classes = useStyles();

  const { setPosts, createPost, updatePost } = useContext(PostContext);
  const [editMode, setEditMode] = useState("Create");
  const [pickedCardImage, setPickedCardImage] = useState();
  const [pickedCardImageOne, setPickedCardImageOne] = useState();
  const [pickedCardImageTwo, setPickedCardImageTwo] = useState();
  const [resetComponent, setResetComponent] = useState(false);
  const [editPostId, setEditPostId] = useState();
  const [postTitleInput, setPostTitleInput] = useState("");
  const [fontSize, setFontSize] = useState(2);

  useEffect(() => {
    adjustFontSize();
    console.log("fontSize effect", fontSize);
  }, [postTitleInput]);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm("");

  const resetForm = () => setResetComponent(!resetComponent);

  const submitPost = async (data) => {
    console.log("send data", data);
    console.log("send pickedCardImage", pickedCardImage);
    var formData = new FormData();
    const values = getValues();
    try {
      const dataFunction = async () => {
        formData.append("title", values.title);
        formData.append("caption", values.caption);
        formData.append("content", values.content);
        formData.append("cardImage", pickedCardImage);
        formData.append("postImageOne", pickedCardImageOne);
        formData.append("postImageTwo", pickedCardImageTwo);
        formData.append("hiddenTitleFontSize", fontSize);
        // props.addNewPost((prevState) => [response.post, ...prevState]);
      };
      await dataFunction();

      await createPost(formData);
      console.log("postForm formData", formData);
      reset();
    } catch (err) {
      console.log("submitPost error", err);
    }
  };

  const editPost = async ({ data }) => {
    console.log("editPost Initiated data", data);
    var formData = new FormData();
    const values = getValues();
    try {
      const dataFunction = async () => {
        formData.append("title", values.title);
        formData.append("caption", values.caption);
        formData.append("content", values.content);
        formData.append("cardImage", pickedCardImage);
        formData.append("postImageOne", pickedCardImageOne);
        formData.append("postImageTwo", pickedCardImageTwo);
        // props.addNewPost((prevState) => [response.post, ...prevState]);
      };
      await dataFunction();
      await updatePost({ formData, editPostId });
      resetForm();
      reset();
    } catch (err) {
      console.log("editPost error", err);
    }
  };

  const adjustFontSize = () => {
    const fontSize =
      postTitleInput.length > 15 ? 2 - postTitleInput.length * 0.02 : 2;
    console.log("fontSize", fontSize);
    setFontSize(fontSize);
  };

  return (
    <Box
      className={classes.formContainer}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(editMode === "Edit" ? editPost : submitPost)}
    >
      <h2>{editMode} Post</h2>
      {/* <h1>{props.editPostData.id}</h1> */}

      <Grid container justifyContent="center">
        <Grid item md={12} sm={12}>
          <Box position="relative">
            <TextField
              className={classes.textInput}
              margin="normal"
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name="title"
              inputProps={{
                maxLength: 35,
                style: {
                  width: "250px",
                  fontFamily: "Bangers",
                  fontWeight: 500,
                  fontSize: `${fontSize}rem`,
                },
              }}
              defaultValue={props.editPostData.title || ""}
              {...register("title")}
              onChange={(e) => {
                console.log("event", e.target.value);
                setPostTitleInput(e.target.value);
              }}
            />

            <br />
            <TextField
              className={classes.textInput}
              margin="normal"
              id="outlined-basic"
              label="Caption"
              multiline
              rows="2"
              variant="outlined"
              name="caption"
              inputProps={{ maxLength: 70, style: { width: "250px" } }}
              defaultValue={props.editPostData.caption || ""}
              {...register("caption")}
            />
            <br />
            <TextField
              className={classes.textInput}
              fullWidth
              margin="normal"
              rows="10"
              id="outlined-multiline-flexible"
              label="Content"
              multiline
              defaultValue={props.editPostData.content || ""}
              {...register("content")}
            />
          </Box>
        </Grid>
        <br />

        <Grid item>
          <Box display="flex">
            <ImageUpload
              name="cardImage"
              displayName="Card Image"
              previewImage={props?.editPostData?.postURLs?.[0]}
              setImage={setPickedCardImage}
              resetForm={resetComponent}
            />
            <ImageUpload
              name="postImageOne"
              displayName="Post Image One"
              previewImage={props?.editPostData?.postURLs?.[1]}
              setImage={setPickedCardImageOne}
              resetForm={resetComponent}
            />
            {/* <ImageUpload
              name="postImageTwo"
              displayName="Post Image Two"
              previewImage={props?.editPostData?.postURLs?.[2]}
              // inputRef={register}
              setImage={setPickedCardImageTwo}
              resetForm={resetComponent}
            /> */}
            {/* <input ref={register} name="cardImage" type="file" /> */}
            {appendErrors.password && <p>{appendErrors.password.message}</p>}
          </Box>
        </Grid>
        <Grid item md={12} align="center">
          <Button
            type="submit"
            color="success"
            variant="contained"
            className={classes.postButton}
          >
            {editMode === "Edit" ? "Edit" : "Post"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostForm;
