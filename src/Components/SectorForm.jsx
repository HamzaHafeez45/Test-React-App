import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  selector: yup.string("Enter Selector").required("Selector is required"),
});

const SectorForm = () => {
  const formik = useFormik({
    initialValues: {
      selector: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/selector", {
          selector: values.selector,
        })
        .then((response) => {
          toast("Success");
        })
        .catch((error) => {
          toast(error);
        });
    },
  });

  return (
    <>
      <ToastContainer />
      <h2>Add Selector</h2>
      <form onSubmit={formik.handleSubmit}>
        <div id="field">
          <TextField
            sx={{ width: 400 }}
            id="selector"
            name="selector"
            label="Selector"
            value={formik.values.selector}
            onChange={formik.handleChange}
          />
          <FormHelperText>
            {formik.touched.selector && formik.errors.selector}
          </FormHelperText>
        </div>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default SectorForm;
