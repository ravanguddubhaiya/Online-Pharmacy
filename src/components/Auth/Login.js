import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginCustomer } from "../../services/API/authApi";
import "./Auth.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("(*) Email is not empty")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email is invalid"
        ),
      password: Yup.string()
        .required("(*) Password is not empty")
        .min(6, "Must be 6-32 letters")
        .max(32, "Must be 6-32 letters"),
    }),
    onSubmit: async (values) => {
      const customer = { email: values.email, password: values.password };
      await loginCustomer(dispatch, navigate, customer);
    }
      
  });

  return (
    <div className="limiter">
      <div className="container-login100">
        <form onSubmit={formik.handleSubmit}>
          <div className="wrap-login100">
            <span className="login100-form-title mt-5">Login</span>
            <div className="d-flex justify-content-center pb-5"></div>

            <div className="wrap-input100">
              <input
                name="email"
                className="input100"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="wrap-input100">
              <input
                name="password"
                className="input100"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </div>

            <button className="login100-form-btn" type="submit">
              Login
            </button>

            <div className="text-center py-4">
              <span className="txt1">Create an account?</span>
              &nbsp;
              <NavLink to="/register" className="txt2">
                Click
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
