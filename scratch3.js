import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ImageInput = ({ name }) => {
  const [selectedImage, setSelectedImage] = useState();
  const { register } = useFormContext();
  const { ref, ...fields } = register(`${name}`, {
    onchange: (e) => console.log("Onchange Happened"),
  });
  const inputRef = useRef();

  const pickImageHandler = () => {
    inputRef.current?.click();
  };
  const imageChange = (e) => {
    console.log("imageChange onChange triggered");
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log("e.target.files[0]", e.target.files);
    }
  };

  return (
    <Box className={classes.inputContainer}>
      <div className={classes.previewContainer}>
        <input
          type="file"
          accept=".jpg,.png,.jpeg"
          style={{ display: "none" }}
          {...fields}
          ref={(instance) => {
            ref(instance);
            inputRef.current = instance;
          }}
        />
        {!selectedImage && <p>Pick an image.</p>}
        {selectedImage && (
          <div className={classes.previewContainer}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Thumb"
              className={classes.previewImage}
            />
          </div>
        )}
      </div>
      <Button
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
