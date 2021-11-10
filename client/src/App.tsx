import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

interface SampleApiResponse {
  id: number;
  value: string;
}

const Content = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  marginTop: theme.spacing(8),
}));

const App = () => {
  const [results, setResults] = useState<SampleApiResponse[]>([]);

  useEffect(() => {
    fetch("/api/list")
      .then((response) => response.json())
      .then((data) => setResults(data));
  }, []);

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" component="div">
            AppEngine starter
          </Typography>
        </Toolbar>
      </AppBar>
      <Content>
        <p>Data loaded from API:</p>
        <ul>
          {results.map((result: SampleApiResponse) => (
            <li key={result.id}>
              {result.id} - {result.value}
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  );
};

export default App;
