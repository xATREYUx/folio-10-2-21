import { Box } from "@mui/system";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

import Button from "./button";
import { ImageUploadContainer } from "./form-elements-style";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const setImage = props.setImage;
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      if (props.previewImage) {
        console.log("Edit Mode");
        setPreviewUrl(props.previewImage);
      } else {
        console.log("file not loaded");
        return;
      }
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file, props.previewImage]);

  const pickedHandler = (event) => {
    console.log("pickedHandler", event.target);
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    setImage(pickedFile);
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Box>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </Box>
  );
};

export default ImageUpload;