import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

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
  const [name, setName] = useState('');
  const [maxParticipant, setMaxParticipant] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Here, you would handle the form submission, such as making an API call
    console.log('Queue Created:', { name, maxParticipant, image });
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
        disabled={!isFormComplete}
      >
        Create Queue
      </Button>
    </StyledContainer>
  );
};

export default CreateQueue;
