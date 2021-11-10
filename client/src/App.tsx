import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface SampleApiResponse {
    id: number;
    value: string;
}

const App = () => {
    const [results, setResults] = useState<SampleApiResponse[]>([]);

    useEffect(() => {
        fetch("/api/list")
            .then(response => response.json())
            .then(data => setResults(data));
    }, []);

    return (
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    AppEngine starter
                </Typography>
                <ul>{
                    results.map((result: SampleApiResponse) => (
                        <li key={result.id}>{result.id} - {result.value}</li>
                    ))
                }</ul>
            </Box>
        </Container>
    );
}

export default App