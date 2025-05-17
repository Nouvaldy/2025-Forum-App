import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, FormControl, Box } from '@mui/material';
import useInput from '../hooks/useInput';

export default function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  return (
    <FormControl>
      <Box
        component="form"
        noValidate
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <TextField
          name="fullName"
          required
          fullWidth
          id="fullName"
          label="Full Name"
          autoFocus
          value={name}
          onChange={onNameChange}
          placeholder="Name"
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => register({ name, email, password })}
          aria-label="Register"
        >
          Sign Up
        </Button>
      </Box>
    </FormControl>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
