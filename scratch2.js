import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { useFormContext, useForm, Controller } from "react-hook-form";

const ImageInput = () => {
  const [selectedImage, setSelectedImage] = useState();
  // This function will be triggered when the file field change
  const classes = useStyles();
  const { register } = useFormContext();
  const filePickerRef = useRef();
  const { trigger, control } = useForm();

  const pickImageHandler = async () => {
    filePickerRef.current.click();
  };
  const imageChange = (e) => {
    console.log("imageChange onChange triggered");
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log("e.target.files[0]", e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  return (
    <Box className={classes.inputContainer}>
      <div className={classes.previewContainer}>
        <Controller
          render={({ field }) => (
            <input
              name="cardImage"
              control={control}
              type="file"
              accept=".jpg,.png,.jpeg"
              style={{ display: "none" }}
              onChange={imageChange}
              {...field}
            />
          )}
        />
        {!selectedImage && <p>Pick an image.</p>}
        {selectedImage && (
          <div className={classes.previewContainer}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Thumb"
              className={classes.previewImage}
            />
            {/* <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button> */}
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="contained"
        className={classes.pickImageButton}
        onClick={pickImageHandler}
      >
        +
      </Button>
    </Box>
  );
};

export default ImageInput;

// // Just some styles
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 50,
//   },
//   preview: {
//     marginTop: 50,
//     display: "flex",
//     flexDirection: "column",
//   },
//   image: { maxWidth: "100%", maxHeight: 320 },
//   delete: {
//     cursor: "pointer",
//     padding: 15,
//     background: "red",
//     color: "white",
//     border: "none",
//   },
// };

const useStyles = makeStyles({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "3px",
  },
  previewContainer: {
    display: "flex",
    position: "relative",
    border: "1px solid #C4C4C4",
    borderRadius: "4px",
    width: "250px",
    height: "175px",
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: "250px",
    height: "175px",
    borderRadius: "4px",
  },
  pickImageButton: {
    minWidth: "0 !important",
    width: "40px",
    height: "40px",
    borderRadius: "50px !important",
    top: "-20px",
  },
});
