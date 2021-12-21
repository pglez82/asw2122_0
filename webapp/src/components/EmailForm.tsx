import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {addUser} from '../api/api'

function EmailForm(): JSX.Element {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addUser(name,email);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
            required
            label="Name" 
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ my: 2 }}
          />
        <TextField
          required
          label="Email" 
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ my: 2 }}
        />
        <Button variant="contained" type="submit" sx={{ my: 2 }}>Accept</Button>
      </form>
    </>
  );
}

export default EmailForm;
