import React from 'react';
import { Container, CssBaseline, Box, Typography, Card } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
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
            Sign up
          </Typography>
          <RegisterInput register={onRegister} />
          <Link to="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Card>
    </Container>
  );
}
