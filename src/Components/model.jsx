import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { TreeSelect } from "antd";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
});

const EditModel = ({ open, handleClose, id }) => {
  const [selectorsdataFromApi, setSelectors] = useState([]);
  const [treeValue, setTreeValue] = useState();
  const navigate = useNavigate();

  const onChange = (value) => {
    setTreeValue(value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      selector: treeValue,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .put(`http://localhost:3000/api/information/${id}`, {
          name: values.name,
          selector: values.selector,
        })
        .then((response) => {
          toast("Success");
          navigate("/");
        })
        .catch((error) => {
          toast("Some error Occured");
        });
    },
  });
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3000/api/selector");
      setSelectors(data);
    };
    getData();
  }, []);
  return (
    <>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-title">
            {"Edit Information"}
          </DialogTitle>
          <DialogContent>
            <div id="field">
              <TextField
                sx={{ width: 400 }}
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
              <FormHelperText>
                {formik.touched.name && formik.errors.name}
              </FormHelperText>
            </div>
            <TreeSelect
              id="selector"
              name="selector"
              value={formik.values.selector}
              dropdownStyle={{ maxHeight: 400 }}
              treeData={selectorsdataFromApi}
              allowClear
              showSearch
              placeholder="Select Selector"
              onChange={onChange}
            />
            <FormHelperText>
              {formik.touched.selector && formik.errors.selector}
            </FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Back</Button>
            <Button autoFocus variant="contained" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditModel;
