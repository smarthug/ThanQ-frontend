import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Avatar, Grid, Button, TextField, MenuItem, Select, InputLabel, FormControl, CardHeader, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

// import { useBoothCounter } from '../../hooks/useBoothCounter';
// import { useBooths } from '../../hooks/useBooths';
import { useGetAllWaitingAmount } from '../../hooks/useReadThanQContract';


const logoURL = "https://bafybeib3f6u3cs5ob2efhsrvlvgxu7fax7e5z5pdhu7ddlwkaerepebb7a.ipfs.w3s.link/"
// Custom styled card component
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    height: '313px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
    },
}));

// Card component to display booth information
const QueueCard = ({ boothName, queueCount, boothLogo }) => {
    return (
        <Card>
            {/* Use CardMedia to display the logo as a banner image */}
            <CardMedia
                component="img"
                height="60"
                image={`https://bafybeib3f6u3cs5ob2efhsrvlvgxu7fax7e5z5pdhu7ddlwkaerepebb7a.ipfs.w3s.link/${boothName}.svg`}
                alt={`${boothName} Logo`}
            />
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                    {boothName}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                    Queue Count:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    {queueCount}
                </Typography>
                <Link to={`/joinQueue/${1}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        View Details
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};



// Example usage of the card
const HomeScreen = () => {
    // const boothCounter = useBoothCounter();
    // console.log(Number(boothCounter.data));
    // const booth = useBooths(1);
    // console.log(booth);
    // console.log("fefefefefef")
    const allWaitingAmount = useGetAllWaitingAmount();
    console.log(allWaitingAmount);

    const [booths, setBooths] = useState([{ 'boothName': 'BASE', 'queueCount': 5 },
    { 'boothName': 'Hedera', 'queueCount': 4 },
    { 'boothName': 'KINTO', 'queueCount': 7 },
    { 'boothName': 'Layer%20Zero', 'queueCount': 2 },
    { 'boothName': 'Morph', 'queueCount': 9 },
    { 'boothName': 'Protocol%20Labs', 'queueCount': 2 },
    { 'boothName': 'Push', 'queueCount': 2 },
    { 'boothName': 'Scroll', 'queueCount': 6 },
    { 'boothName': 'XMTP', 'queueCount': 6 },
    { 'boothName': 'bitkub', 'queueCount': 7 },
    { 'boothName': 'chiliz', 'queueCount': 8 },
    { 'boothName': 'flow', 'queueCount': 9 },
    { 'boothName': 'polygon', 'queueCount': 9 },
    { 'boothName': 'sign', 'queueCount': 10 },
    { 'boothName': 'vlayer', 'queueCount': 5 },
    { 'boothName': 'world', 'queueCount': 4 }]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        if (e.target.value === 'asc') {
            setBooths([...booths].sort((a, b) => a.queueCount - b.queueCount));
        } else if (e.target.value === 'desc') {
            setBooths([...booths].sort((a, b) => b.queueCount - a.queueCount));
        }
    };

    const filteredBooths = booths.filter((booth) =>
        booth.boothName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box
            sx={{
                marginTop: "56px",
                marginBottom: "56px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'auto',
            }}
        >
            <Box sx={{ width: '80%', maxWidth: 600, mb: 4, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Search Booths"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FormControl fullWidth variant="outlined">
                    <InputLabel>Sort By Queue</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
                        label="Sort By Queue"
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="asc">Queue Count Ascending</MenuItem>
                        <MenuItem value="desc">Queue Count Descending</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={2} justifyContent="center" p={3}>
                {filteredBooths.map((booth, index) => (
                    <Grid item xs={6} sm={6} md={6} key={index}>
                        <QueueCard
                            boothName={booth.boothName}
                            queueCount={booth.queueCount}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomeScreen;



// BASE

// Hedera

// KINTO

// Layer

// Morph

// Protocol

// Push

// Scroll

// XMTP

// bitkub

// chiliz

// flow

// polygon

// sign

// vlayer

// world