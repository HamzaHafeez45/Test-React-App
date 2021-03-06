import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { TreeSelect } from "antd";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  agreement: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

const Form = () => {
  const [selectorsdataFromApi, setSelectors] = useState([]);
  const [treeValue, setTreeValue] = useState();
  const navigate = useNavigate();

  const onChange = (value) => {
    setTreeValue(value);
  };

  const formik = useFormik({
    initialValues: {
      name: JSON.parse(window.localStorage.getItem("form-values"))
        ? JSON.parse(window.localStorage.getItem("form-values")).name
        : "",
      selector: treeValue,
      agreement: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/information", {
          name: values.name,
          selector: treeValue,
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
              sx={{ width: 300 }}
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
