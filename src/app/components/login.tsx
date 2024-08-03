import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { auth } from '@/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
type loginPageProps = {
  setDisplay: React.Dispatch<React.SetStateAction<number>>;
}
export default function LoginPage({setDisplay} : loginPageProps) {

  //fields
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword1, setSignupPassword1] = useState('');
  const [signupPassword2, setSignupPassword2] = useState('');

  async function register() {
      if(signupPassword1 !== signupPassword2) {
        alert("Passwords do not match!");
        return;
      }
      if(signupPassword1.length < 6) {
        alert("Passwords need to be at least 6 characters");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, signupEmail, signupPassword1);

        setDisplay(1);
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
  }
  async function signin() {
    try {
      await signInWithEmailAndPassword(auth, signinEmail, signinPassword);
    } catch(error) {
      console.error(error);
        alert("Something went wrong");
    }
  }
  
  return(
      <Box className="w-screen h-[90vh] overflow-hidden">
        <Container component="main" className="flex flex-row justify-evenly">
        {/* login */}
        <Box className="flex flex-cal items-center bg-white mt-20  p-10 rounded-lg w-[44%] shadow-lg">
          <Typography component="h1" variant="h5" className="flex-1">
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }} className="flex-[4]">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setSigninEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setSigninPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>{
                e.preventDefault();
                signin();
              }}
            >
              Sign In
            </Button>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> 
          </Box>
        </Box>
      {/* sign up */}
      <Box className="flex flex-cal items-center bg-white mt-20 p-10 rounded-lg w-[44%] shadow-lg">
        <Typography component="h1" variant="h5" className="flex-1">
          Sign up
        </Typography>
        <Box component={'form'} noValidate sx={{ mt: 1 }} className="flex-[4]">
          <TextField
            margin="normal"
            required
            fullWidth
            id="registeremail"
            label="Email Address"
            name="registeremail"
            autoComplete="email"
            autoFocus
            onChange={(e)=>setSignupEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="registerpassword1"
            label="New Password"
            type="password"
            id="registerpassword1"
            onChange={(e)=>setSignupPassword1(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="registerpassword2"
            label="Comfirm Password"
            type="password"
            id="registerpassword2"
            onChange={(e)=>setSignupPassword2(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e)=>{
              e.preventDefault();
              register();
            }}
          >
            Register
          </Button>

        </Box>
      </Box>

      </Container>
  </Box>
  );
}