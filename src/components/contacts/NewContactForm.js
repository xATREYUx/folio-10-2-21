import React, { useState, useContext } from "react";
import { FormContainer } from "./contacts.styles";
import { appendErrors, useForm } from "react-hook-form";

import axios from "axios";
import domain from "../../util/domain";

import Captcha from "../form-elements/captcha";
import { Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    justifyContent: "left",
    padding: "1rem",
    marginLeft: "40px",
    marginTop: "2rem",
  },
  contactMeTitle: {
    fontFamily: "Bangers",
    // fontSize: "rem",
    letterSpacing: ".2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  textField: {},
  input: {
    // ...theme.input,
    backgroundColor: "white",
  },
  captchaContainer: {
    width: "40%",
  },
}));

const ContactUs = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState();
  const { register, handleSubmit, reset } = useForm("");
  // const { sendRequest } = useHttpClient();
  const [resetComponent, setResetComponent] = useState(false);

  const resetForm = () => setResetComponent(!resetComponent);

  const submitContact = async (e) => {
    e.preventDefault();

    console.log("send data", e);

    try {
      const newContactBody = {
        name,
        email,
        message,
      };
      console.log("new contact form token: ", captcha.token);
      let headers = {
        headers: {
          Authorization: "Bearer " + captcha.token,
        },
      };
      axios.post(`${domain}/contacts`, newContactBody, headers);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.log("submitContact error", err);
    }
  };

  return (
    // <Paper id="form-container">
    <Paper
      position="relative"
      className={classes.formContainer}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitContact}
    >
      {/* <form className="new-contact-form" onSubmit={submitContact}> */}
      <h2 className={classes.contactMeTitle}>Contact Me</h2>
      <TextField
        className={classes.textField}
        type="text"
        placeholder="Name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        InputProps={{
          className: classes.input,
        }}
      />
      <br />
      <TextField
        type="text"
        placeholder="Email"
        name="email"
        maxLength="42"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        InputProps={{
          className: classes.input,
        }}
      />
      <br />
      <TextField
        type="textarea"
        placeholder="Message"
        fullWidth
        rows="10"
        multiline
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        InputProps={{
          className: classes.input,
        }}
      />
      <br />
      <div className={classes.captchaContainer}>
        <Captcha setCaptcha={setCaptcha} />
      </div>
      {appendErrors.password && <p>{appendErrors.password.message}</p>}
      <br />
      <Button color="success" variant="contained" type="submit">
        Send
      </Button>
      {/* </form> */}
    </Paper>
    // </Paper>
  );
};

export default ContactUs;
