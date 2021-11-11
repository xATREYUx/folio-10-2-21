// const submitPost = async (data) => {
//   var formData = new FormData();
//   const values = getValues();
//   try {
//     const dataFunction = async () => {
//       formData.append("cardImage", values.cardImage[0]);
//     };
//     await dataFunction();
//     //send to backEnd
//     await createPost(formData);
//     console.log("postForm formData", formData);
//     reset();
//   } catch (err) {
//     console.log("submitPost error", err);
//   }
// };

const ImageInput = () => {
  const [selectedImage, setSelectedImage] = useState();
  const pickImageHandler = async () => {
    //I dont know what to ref here??
    ref.current.click();
  };
  const imageChange = (e) => {
    console.log("imageChange onChange triggered");
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  <>
    <Controller
      control={control}
      render={({ field }) => (
        <input
          control={control}
          type="file"
          accept=".jpg,.png,.jpeg"
          style={{ display: "none" }}
          onChange={imageChange}
          {...field}
        />
      )}
    />
    <Button
      type="button"
      variant="contained"
      className={classes.pickImageButton}
      onClick={pickImageHandler}
    >
      Add Image
    </Button>
  </>;
};

const PostForm = (props) => {
  <>
    <FormProvider {...methods}>
      <ImageInput {...register("cardImage")} name="cardImage" />
    </FormProvider>
    <Button type="submit" className={classes.postButton}>
      Post
    </Button>
  </>;
};
