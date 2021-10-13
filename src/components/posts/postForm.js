import { useState, useContext } from "react";
// import { FormContainer } from "./posts.styles";
import ImageUpload from "../form-elements/ImageUpload";
import PostContext from "./postContext";
import { appendErrors, useForm } from "react-hook-form";
import Button from "../form-elements/button";
import { Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";

// import { createPost } from "./postActions";

const useStyles = makeStyles({
  textInput: {
    marginBottom: "3px",
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
        // props.addNewPost((prevState) => [response.post, ...prevState]);
      };
      await dataFunction();

      await createPost(formData);
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

  return (
    <Box
      component="form"
      sm={{
        "& .MuiTextField-root": { m: 1, width: "100sch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(editMode === "Edit" ? editPost : submitPost)}
    >
      {/* <form
        id="post-form"
        onSubmit={handleSubmit(editMode === "Edit" ? editPost : submitPost)}
        // enctype="multipart/form-data"
      > */}
      <h1>{editMode} Post</h1>
      <h1>{props.editPostData.id}</h1>
      <br />
      <Grid container spacing={2} sm={8}>
        <TextField
          className={classes.textInput}
          margin="normal"
          fullWidth="true"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          name="title"
          inputProps={{ maxLength: 20 }}
          defaultValue={props.editPostData.title || ""}
          {...register("title")}
        />
        {/* <input
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={props.editPostData.title || ""}
          {...register("title")}
        /> */}
        <br />
        <TextField
          className={classes.textInput}
          margin="normal"
          fullWidth="true"
          id="outlined-basic"
          label="Caption"
          variant="outlined"
          name="caption"
          inputProps={{ maxLength: 40 }}
          defaultValue={props.editPostData.caption || ""}
          {...register("caption")}
        />
        {/* <input
          type="text"
          placeholder="42 Charachter Limit"
          name="caption"
          maxLength="42"
          defaultValue={props.editPostData.caption || ""}
          {...register("caption")}
        /> */}
        <br />
        <TextField
          className={classes.textInput}
          fullWidth="true"
          margin="normal"
          rows="10"
          id="outlined-multiline-flexible"
          label="Content"
          multiline
          maxRows={100}
          defaultValue={props.editPostData.content || ""}
          {...register("content")}
        />
      </Grid>

      {/* <textarea
          type="textarea"
          placeholder="Content"
          name="content"
          cols="30"
          rows="10"
          defaultValue={props.editPostData.content || ""}
          {...register("content")}
        /> */}
      <br />
      <Grid container spacing={2} lg={4}>
        <Grid item sm={12}>
          <ImageUpload
            name="cardImage"
            displayName="Card Image"
            previewImage={props?.editPostData?.postURLs?.[0]}
            // inputRef={register}
            setImage={setPickedCardImage}
            resetForm={resetComponent}
          />
        </Grid>
        <Grid item sm={12}>
          <ImageUpload
            name="postImageOne"
            displayName="Post Image One"
            previewImage={props?.editPostData?.postURLs?.[1]}
            // inputRef={register}
            setImage={setPickedCardImageOne}
            resetForm={resetComponent}
          />
        </Grid>
        <Grid item sm={12}>
          <ImageUpload
            name="postImageTwo"
            displayName="Post Image Two"
            previewImage={props?.editPostData?.postURLs?.[2]}
            // inputRef={register}
            setImage={setPickedCardImageTwo}
            resetForm={resetComponent}
          />
          {/* <input ref={register} name="cardImage" type="file" /> */}
          {appendErrors.password && <p>{appendErrors.password.message}</p>}
        </Grid>
      </Grid>

      <Button type="submit">{editMode === "Edit" ? "Edit" : "Post"}</Button>
      {/* </form> */}
    </Box>
  );
};

export default PostForm;
