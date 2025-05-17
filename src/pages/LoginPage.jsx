import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  CssBaseline,
  Typography,
  Container,
  Card,
} from '@mui/material';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };
  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ padding: 8, mt: 8, boxShadow: 3 }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginInput login={onLogin} />
          <Link to="/register">Don&apos;t have an account? Sign Up</Link>
        </Box>
      </Card>
    </Container>
  );
}
