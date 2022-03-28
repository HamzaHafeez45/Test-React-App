import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  selector: yup.string("Select Selector").required("Selector is required"),
  agreement: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

const Form = () => {
  const [selectors, setSelectors] = useState([]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: JSON.parse(window.localStorage.getItem("form-values"))
        ? JSON.parse(window.localStorage.getItem("form-values")).name
        : "",
      selector: "",
      agreement: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/information", {
          name: values.name,
          selector: values.selector,
          agreement: values.agreement,
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
    window.localStorage.setItem("form-values", JSON.stringify(formik.values));
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
      <div className="form-box">
        <h2>Submit your Info!</h2>
        <form onSubmit={formik.handleSubmit}>
          <div id="field">
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
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
              >
                <option aria-label="Select Selector" value="" />
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
          <div id="field">
            <FormControlLabel
              control={
                <Checkbox
                  name="agreement"
                  id="agreement"
                  value={formik.values.agreement}
                  onChange={formik.handleChange}
                />
              }
              label="Agree to terms"
            />
            <FormHelperText component="legend">
              {formik.touched.agreement && formik.errors.agreement}
            </FormHelperText>
          </div>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default Form;
