import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import { ReactComponent as BlobTop } from "../shared/images/blobTop.svg";
import world from "../shared/images/logo.svg";
import blobTop from "../shared/images/blobTop.svg";
// import PostList from "../components/posts/postList";
import {
  AnimationLookDown,
  AnimationFreeFall,
  AnimationCoupleSitting,
} from "../shared/SilhouetteBlocks/SilhouetteBlocks";
// import personDown from "../shared/images/personDown@3x.png";
// import freeFall from "../shared/images/freefall.svg";
import coupleSitting from "../shared/images/girlAndBoy.svg";
import AboutThisSite from "../components/aboutThisSite/AboutThisSite";
import { Box } from "@mui/system";
import AuthContext from "../components/auth/authContext";
import PostList from "../components/posts/postList";
import PostContext from "../components/posts/postContext";
import AboutThisSiteTwo from "../components/aboutThisSite/aboutThisSiteTwo";
import LetsBuild from "../components/letsBuild";
// import { AnimationFreeFall } from "../shared/SilhouetteBlocks/SilhouetteBlocks";

const useStyles = makeStyles((theme) => ({
  sectionOne: {
    display: "flex",
    flexDirection: "column",
    height: "85vh",
    alignItems: "center",
    justifyContent: "center",
  },
  world: {
    height: "30vw",
    maxWidth: "250px",
    // transform: "translatey(-30px)",
    /* margin: 40px; */
    /* margin-top: 60px; */
  },
  sectionTwo: {
    backgroundImage: `url(${blobTop})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundWidth: "100%",
    paddingBottom: "66.64%",
  },
  coupleSitting: {
    height: "4rem",
    left: "35%",
    top: "-35px",
    // display: "flex",
    position: "relative",
  },
  mainTitle: {
    // display: "flex",
    fontFamily: "Bangers",
    fontSize: "3rem",
    letterSpacing: ".2rem",
    justifyContent: "center",
    // marginX: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
      width: "90%",
      // padding: ".5rem",
      marginTop: "0",
      // marginLeft: "2rem",
      marginBottom: "1rem",
    },
  },
}));

const HomePage = () => {
  const { loggedIn } = useContext(AuthContext);
  const { posts } = useContext(PostContext);

  console.log("HomePage loggedIn", loggedIn);
  const classes = useStyles();
  return (
    <Box>
      <div className={classes.sectionOne}>
        <img src={world} className={classes.world} />
        <LetsBuild className={classes.letsBuild} />
      </div>
      <div className={classes.sectionTwo}>
        <img
          src={coupleSitting}
          alt="coupleSitting"
          className={classes.coupleSitting}
        />
        <Grid container>
          <Grid item item xs={12} md={7} align="center">
            <h1 className={classes.mainTitle}>
              <div>React Engineering</div>
            </h1>
            <AboutThisSite />
            <PostList posts={posts} dataLimit={4} pageLimit={4} title="" />
          </Grid>
          <Grid item align="center" xs={12} md={5}>
            <AboutThisSiteTwo />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default HomePage;
