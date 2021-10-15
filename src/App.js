import "./App.css";
import axios from "axios";

//initialize app
import firebaseConfig from "./firebase/config";

import Router from "./routing/Router";
import Layout from "./components/layout";
import HomePage from "./pages/homePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthContextProvider } from "./components/auth/authContext";
import { PostContextProvider } from "./components/posts/postContext";

const theme = createTheme({
  palette: {
    primary: { 500: "#E85B25" },
  },
  typography: {
    h1: {
      fontFamily: "Bangers",
    },
    subtitle1: {
      fontFamily: "Cuprum",
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
});

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
