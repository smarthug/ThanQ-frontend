import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

// import { useRegisterBooth } from '../../hooks/useRegisterBooth';


import { abi } from "./abi.json";
import { useWriteContract } from 'wagmi';

const CONTRACT_ADDRESSES = {
  80002: "0xc1201A262aD48b0EaF44421E13eB22c0a8ab4368", // Polygon Mumbai
  534351: "0x5c59052D1853145DDe9bc462b61302C252FCc5df", // Scroll Testnet
  84532: "0xC80a7FDd3A63fc5666213a5a0fE5a3681369DE70", // Base Testnet
  25925: "0xff23b48Cd4A045eD210435FaDF54352C09F985c8", // Bitkub Testnet
  545: "0xff23b48Cd4A045eD210435FaDF54352C09F985c8", // Flow Testnet
  296: "0x6A5ABe9DECccB57170d9C43A3a5028aa9104AC41", // Hedera Testnet
};

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '16px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
  width: '100%',
});

const ImageInput = styled('input')({
  marginBottom: '16px',
  width: '100%',
});

const PreviewImage = styled('img')({
  marginBottom: '16px',
  maxWidth: '100%',
  maxHeight: '200px',
});

const CreateQueue = () => {

  const { writeContract } = useWriteContract()
  const [name, setName] = useState('fefef');
  const [maxParticipant, setMaxParticipant] = useState('');
  const [image, setImage] = useState(null);


  const baseURI = 'https://api.example.com';
  // const { write, isLoading, isSuccess, isError } = useRegisterBooth(name, baseURI);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Here, you would handle the form submission, such as making an API call
    console.log('Queue Created:', { name, maxParticipant, image });

    writeContract({
      abi,
      address: CONTRACT_ADDRESSES[545],
      functionName: 'registerBooth',
      args: [name, baseURI],
    })
  };



  const isFormComplete = name !== '' && maxParticipant !== '' && image !== null;

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Create Queue
      </Typography>
      <StyledTextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledTextField
        label="Max Participants"
        variant="outlined"
        type="number"
        value={maxParticipant}
        onChange={(e) => setMaxParticipant(e.target.value)}
      />
      <ImageInput
        accept="image/*"
        type="file"
        onChange={handleImageChange}
      />
      {image && (
        <PreviewImage
          src={URL.createObjectURL(image)}
          alt="Preview"
        />
      )}
      <Button
        sx={{ background: (theme) => theme.palette.gradient.main }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      // disabled={!isFormComplete}
      >
        Create Queue
      </Button>
    </StyledContainer>
  );
};

export default CreateQueue;
