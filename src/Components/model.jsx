import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  selector: yup.string("Select Selector").required("Selector is required"),
  agreement: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

const EditModel = ({ open, handleClose, id }) => {
  const [selectors, setSelectors] = useState([]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      selector: "",
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
                fullWidth
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
            <div id="field">
              <FormControl sx={{ width: 400 }}>
                <InputLabel>Selectors</InputLabel>
                <Select
                  native
                  id="selector"
                  name="selector"
                  label="Selector"
                  value={formik.values.selector}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.selector && Boolean(formik.errors.selector)
                  }
                >
                  <option aria-label="None" value="" />
                  {selectors.map((selector) => (
                    <option key={selector._id} value={selector._id}>
                      {selector.selector}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText>
                {formik.touched.selector && formik.errors.selector}
              </FormHelperText>
            </div>
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
