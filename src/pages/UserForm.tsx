import { Grid, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../types/user.interface";

const UserForm: React.FC = () => {
  const [userInput, setUserInput] = useState<User>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput({ ...userInput, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User Data", userInput);
    localStorage.setItem("User Data", JSON.stringify(userInput));
    navigate("/home");
  };

  const paper = {
    padding: 20,
    width: 380,
    margin: "70px auto",
    border: "2px solid black",
    borderRadius: "0px",
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Paper elevation={10} style={paper}>
          <Grid
            container
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
          </Grid>
          <br />
          <br />
          <Grid
            container
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="name"
                  autoComplete="name"
                  variant="outlined"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={userInput.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <br />
                <TextField
                  type="email"
                  autoComplete="email"
                  variant="outlined"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={userInput.email}
                  onChange={handleChange}
                  error={
                    userInput.email !== "" && !isValidEmail(userInput.email)
                  }
                  helperText={
                    userInput.email !== "" && !isValidEmail(userInput.email)
                      ? "Invalid email format"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <br />
                <TextField
                  variant="outlined"
                  type="number"
                  required
                  fullWidth
                  label="Phone Number"
                  autoComplete="phoneNumber"
                  name="phoneNumber"
                  value={userInput.phoneNumber}
                  onChange={handleChange}
                  error={
                    userInput.phoneNumber !== "" &&
                    !isValidPhoneNumber(userInput.phoneNumber)
                  }
                  helperText={
                    userInput.phoneNumber !== "" &&
                    !isValidPhoneNumber(userInput.phoneNumber)
                      ? "Invalid phone number format"
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ background: "black" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default UserForm;
