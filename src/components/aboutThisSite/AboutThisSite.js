import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { ClassSharp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  aboutThisSiteContent: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  aboutThisSiteType: {
    ...theme.typography.subtitle1,
    color: "white",
    width: "75%",
    // padding: "1rem",
    marginBottom: "1rem",
    // margin: "2rem",
    textAlign: "justify",
    // textJustify: "inter-word",
    [theme.breakpoints.down("md")]: {
      // alignItems: "center",
      width: "85%",
      padding: "1rem",
      margin: "1rem",
    },
  },
}));
export default function BasicCard() {
  const classes = useStyles();
  return (
    // <Box m={6} className={classes.}>
    // {/* <Card> */}
    <div className={classes.aboutThisSiteContent}>
      <Box className={classes.aboutThisSiteType}>
        Using ReactJS and Node I create single-page apps and components capable
        of monetization, data charting, api calls, user authentication and
        authorization, database and context management, and more.
      </Box>
    </div>
    // {/* </Card> */}
    // </Box>
  );
}
