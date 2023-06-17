import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import isURL from "validator/lib/isURL";

function App() {
  const [open, setOpen] = useState(false);
  // const [error, setError] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const BASE_URL = "http://localhost:5000/";

  const handleShortenClick = () => {
    if (longUrl && isURL(longUrl)) {
      axios
        .post(`/shortUrl`, {
          fullUrl: longUrl,
        })
        .then(function (response) {
          console.log("🚀 ~ file: App.js:37 ~ response:", response);
          setShortUrl(BASE_URL + response.data.shortUrl);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setLongUrl("");
  };

  const handleCopyClick = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  return (
    <div className="App">
      <div className="heading">URL Shortner</div>
      <div className="main">
        <TextField
          // error={error}
          id="outlined-basic"
          label="Enter Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          // helperText={error && "Enter URL to shorten it."}
          className="text-field"
          sx={{
            // m: 5,
            // width: "60ch",
            "& .MuiInputLabel-root.Mui-focused": { color: "#11999E" }, //styles the label
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "#11999E",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      color: "#11999E",
                    },
                  },
                }}
              >
                <LanguageOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          className="shortenButton"
          onClick={handleShortenClick}
        >
          Shorten URL
        </Button>
        <TextField
          id="outlined-basic"
          label="Shorten URL"
          value={shortUrl}
          className="text-field"
          sx={{
            // m: 7,
            // width: "60ch",
            "& .MuiInputLabel-root.Mui-focused": { color: "#11999E" }, //styles the label
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                borderColor: "#11999E",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkOutlinedIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopyClick}>
                  <ContentCopyOutlinedIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
      >
        <Alert
          severity="success"
          style={{
            backgroundColor: "#aee6ae",
            color: "darkgreen",
            width: "15em",
            fontSize: "18px",
          }}
        >
          Url Copied !
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
