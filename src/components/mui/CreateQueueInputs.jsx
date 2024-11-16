import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

import { useRegisterBooth } from '../../hooks/useWriteThanQContract';

import { create } from '@web3-storage/w3up-client'

import * as Client from "@web3-storage/w3up-client";
// import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
// import * as Proof from "@web3-storage/w3up-client/proof";
// import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";

const client = await create()

console.log(client)


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

  const [name, setName] = useState('chiliz');
  const [maxParticipant, setMaxParticipant] = useState('');
  const [image, setImage] = useState(null);


  const baseURI = 'https://asynclineup.s3.ap-northeast-2.amazonaws.com/json/chiliz/';
  const registerBooth = useRegisterBooth(name, baseURI);
  // const { write, isLoading, isSuccess, isError } = useRegisterBooth(name, baseURI);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Here, you would handle the form submission, such as making an API call
    console.log('Queue Created:', { name, maxParticipant, image });

    UploadFileToStoracha();
    registerBooth();
    // writeContract({
    //   abi,
    //   address: CONTRACT_ADDRESSES[545],
    //   functionName: 'registerBooth',
    //   args: [name, baseURI],
    // })
  };

  async function UploadFileToStoracha() {
    try {
      const yourEmail = "kirklayer@gmail.com"
      // authorize your local agent to act on your behalf
      const client = await Client.create()
      const myAccount = await client.login(yourEmail)
      console.log(myAccount)

      // lets go!
      // const files = await filesFromPaths(pathToAdd)
      // const cid = await client.uploadDirectory(files)

      // console.log(`IPFS CID: ${cid}`)
      // console.log(`Gateway URL: https://w3s.link/ipfs/${cid}`)

      // Extract the file from the request
      // const form = await request.formData();
      // const file = form.get("file") as unknown as File;

      // Setup the client
      // const principal = Signer.parse(import.meta.env.KEY);
      // console.log(import.meta.env.KEY)
      // const store = new StoreMemory();
      // const client = await Client.create({ principal, store });

      // // Delegate access to the server
      // const proof = await Proof.parse(import.meta.env.PROOF);
      // const space = await client.addSpace(proof);
      // await client.setCurrentSpace(space.did());

      // Upload the file on Storacha
      // const cid = await client.uploadFile(file);

      // Return the CID
      // return NextResponse.json({ cid: cid.toString() }, { status: 200 });
    } catch (e) {
      console.log(e);
      // return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
  }



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
