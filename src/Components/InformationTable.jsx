import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Table from "./Table";
import axios from "axios";

const InformationForm = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const navigate = useNavigate();

  const Columns = [
    {
      Header: "Id",
      accessor: "_id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Selector",
      accessor: "selector",
    },
    {
      accessor: "Edit",
      Header: "Edit",
      Cell: (record) => (
        <>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate(`/editInfo/${record.row["original"]._id}`)}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/information");
      setFetchedData(data);
    };
    getData();
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Information Table</h1>
      <Container style={{ marginTop: "20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table columns={Columns} data={fetchedData} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default InformationForm;
