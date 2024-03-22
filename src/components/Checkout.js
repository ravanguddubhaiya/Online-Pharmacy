import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import queryString from "query-string";
import { checkoutMedicine, sendMailCheckout } from "../services/API/checkoutApi";
import "../css/checkout.css";
import { createHistoryCustomer } from "../services/API/historyApi";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Checkout() {
  const { carts, cartTotalPrice } = useSelector((state) => state.cart);
  const { currentCustomer } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Required")
        .matches(
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Fullname is invalid"
        )
        .min(5)
        .max(20),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid")
        .min(10),
      phone: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Number phone is invalid")
        .min(10)
        .max(10),
      address: Yup.string()
        .required("Required")
        .matches(
          "^[/0-9a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Address is invalid"
        )
        .max(30),
      cardNumber: Yup.string().required("Required").matches(/^[0-9]+$/, "Number phone is invalid")
      .min(16)
      .max(16),
      expiryDate: Yup.string()
        .required("Required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date')
        .test(
          'isFuture',
          'Expiry date must be in the future',
          value => {
            if (!value) return true;
            const today = new Date();
            const [month, year] = value.split('/');
            const expiry = new Date(`20${year}`, month - 1);
            return expiry > today;
          }
        ),
      cvv: Yup.string().required("Required")
        .min(3)
        .max(4),
    }),
    onSubmit: async (values) => {
      for (let item of carts) {
        const params = {
          idMedicine: item.medicine.id,
          medicineCount: item.quantity,
        };
        const query = "?" + queryString.stringify(params);
        await checkoutMedicine(
          dispatch,
          query,
          currentCustomer.token,
          currentCustomer.id
        );

        const paramsHistory = {
          idCustomer: currentCustomer.id,
          phone: values.phone,
          address: values.address,
          fullname: values.fullName,
          total: cartTotalPrice,
          cart: item,
          card_number: values.cardNumber,
          cvv: values.cvv,
          valid_date: values.expiryDate,
        };
        await createHistoryCustomer(dispatch, paramsHistory);
      }
      

      //send data to server
      socket.emit("send_order", currentCustomer.id);

      await sendMailCheckout(dispatch, values, currentCustomer.token);
      setLoad(!load);
      setTimeout(() => {
        setLoad(false);
        setSuccess(!success);
      }, 4000);
    },
  });

  return (
    <div>
      {load && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Checkout</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item">
                      <a href="index">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="cart">Cart</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {!success && (
          <section className="py-5">
            <div className="row">
              <div className="col-lg-8">
                <form onSubmit={formik.handleSubmit}>
                <h2 className="h5 text-uppercase mb-4">Card details</h2>
                <div className="row">
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="cardNumber"
                      >
                        Card Number:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Card Number!"
                        id="cardNumber"
                        name="cardNumber"
                        value={formik.values.cardNumber}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.cardNumber}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                    <label className="text-small text-uppercase" htmlFor="expiryDate">
                      Expiry Date:
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="MM/YY"
                      id="expiryDate"
                      name="expiryDate"
                      value={formik.values.expiryDate}
                      onChange={formik.handleChange}
                    />
                    <p className="text-2xs text-danger">
                      {formik.errors.expiryDate}
                    </p>
                  </div>

                  {/* CVV */}
                  <div className="col-lg-12 form-group m-0">
                    <label className="text-small text-uppercase" htmlFor="cvv">
                      CVV:
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="CVV"
                      id="cvv"
                      name="cvv"
                      value={formik.values.cvv}
                      onChange={formik.handleChange}
                    />
                    <p className="text-2xs text-danger">
                      {formik.errors.cvv}
                    </p>
                  </div>
                  
                  </div>
                <h2 className="h5 text-uppercase mb-4">Billing details</h2>
                  <div className="row">
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Fullname"
                      >
                        Full Name:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Full Name Here!"
                        id="fullName"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.fullName}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Email"
                      >
                        Email:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Email Here!"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.email}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Phone"
                      >
                        Phone Number:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Phone Number Here!"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.phone}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Address:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Address Here!"
                        id="address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.address}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <button
                        className="btn btn-dark"
                        style={{ color: "white" }}
                        type="submit"
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Your order</h5>
                    <ul className="list-unstyled mb-0">
                      {carts.map((item, index) => (
                        <div key={index}>
                          <li className="d-flex align-items-center justify-content-between">
                            <strong className="small font-weight-bold">
                              {item.medicine.name}
                            </strong>
                            <span className="text-muted small">
                              ${item.medicine.price} x {item.quantity}
                            </span>
                          </li>
                          <li className="border-bottom my-2"></li>
                        </div>
                      ))}
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>${cartTotalPrice}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {success && (
          <section className="py-5">
            <div className="p-5">
              <h1>You Have Successfully Ordered!</h1>
              <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
