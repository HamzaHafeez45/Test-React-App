import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { TreeSelect } from "antd";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
});

const EditForm = () => {
  const [selectorsdataFromApi, setSelectors] = useState([]);
  const [treeValue, setTreeValue] = useState();
  const navigate = useNavigate();

  const onChange = (value) => {
    setTreeValue(value);
  };

  let { id } = useParams();

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
          selector: treeValue,
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
      <div className="form-box">
        <h2>Submit your Info!</h2>
        <form onSubmit={formik.handleSubmit}>
          <h2>Edit Information</h2>

          <div id="field">
            <TextField
              sx={{ width: 300 }}
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
            treeData={selectorsdataFromApi}
            allowClear
            showSearch
            placeholder="Select Selector"
            onChange={onChange}
          />
          <FormHelperText>
            {formik.touched.selector && formik.errors.selector}
          </FormHelperText>
          <div style={{ marginTop: "20px" }}>
            <Button style={{ float: "left" }}>Back</Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
