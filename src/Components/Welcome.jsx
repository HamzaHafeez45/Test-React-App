import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
const Welcome = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to Demo App</h1>
      <Container style={{ marginTop: "20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                href="/info"
                style={{ marginTop: "2px" }}
              >
                Show Info
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                href="/addInfo"
                style={{ marginTop: "2px" }}
              >
                Add Info
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                href="/addSector"
                style={{ marginTop: "2px" }}
              >
                Add Selector
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Welcome;
