import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const userData = localStorage.getItem("User Data");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  useEffect(() => {
    if (userData) setIsUser(true);
  }, [userData]);

  const logOut = async () => {
    setIsUser(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                React Task
              </Typography>
              {isUser ? (
                <Button color="inherit" onClick={logOut}>
                  Logout
                </Button>
              ) : null}
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </Stack>
  );
};

export default Header;
