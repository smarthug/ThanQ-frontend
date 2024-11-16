import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

import * as Client from "@web3-storage/w3up-client";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import * as Proof from "@web3-storage/w3up-client/proof";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";

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

  const handleSubmit = async () => {
    await UploadFile();
    console.log('Queue Created:', { name, maxParticipant, image });
  };

  const isFormComplete = name !== '' && maxParticipant !== '' && image !== null;

  async function UploadFile() {
    try {
      if (!image) {
        console.error("No image selected for upload");
        return;
      }
      
      const principal = Signer.parse(import.meta.env.KEY!);
      const store = new StoreMemory();
      const client = await Client.create({ principal, store });

      const proof = await Proof.parse(import.meta.env.PROOF!);
      const space = await client.addSpace(proof);
      await client.setCurrentSpace(space.did());

      // Upload the image file on Storacha
      const cid = await client.uploadFile(image);
      console.log("Image uploaded with CID:", cid);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

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
