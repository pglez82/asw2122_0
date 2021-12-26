import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    console.log("Refreshing users")
    setUsers(await getUsers());
    console.log(users);
  }

  useEffect(()=>{
    refreshUserList();
  },[users]);

  return (
    <>
      <Container maxWidth="sm">
        <Welcome message="ASW students"></Welcome>
        
        <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
        <EmailForm></EmailForm>
        <UserList users={users}/>
      </Container>
    </>
  );
}

export default App;
