import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getTotalPrice } from "../redux/cartSlice";
import CartEmpty from "./CartEmpty";
import CartFilter from "./CartFilter";

export default function CartMedicine() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.auth.login.currentCustomer);
  const carts = useSelector((state) => state.cart.carts);
  const { cartTotalPrice, cartToTalProduct } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    // Dispatch action to calculate total price whenever carts change
    dispatch(getTotalPrice());
  }, [carts, dispatch]);


  const handleProcess = () => {
    if (customer !== null) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };
  return (
    <Fragment>
      {carts.length === 0 ? (
        <CartEmpty />
      ) : (
        <Fragment>
          <div className="container">
            <section className="py-5 bg-light">
              <div className="container">
                <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
                  <div className="col-lg-6">
                    <h1 className="h2 text-uppercase mb-0">Medicine Cart</h1>
                  </div>
                </div>
              </div>
            </section>
            <section className="py-5">
              <div className="row">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <CartFilter />

                  <div className="bg-light px-4 py-3">
                    <div className="row align-items-center text-center">
                      <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                        <NavLink
                          className="btn btn-link p-0 text-dark btn-sm"
                          to="/shop"
                        >
                          <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                          Continue shopping
                        </NavLink>
                      </div>
                      <div className="col-md-6 text-md-right">
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => handleProcess()}
                        >
                          Procceed to checkout
                          <i className="fas fa-long-arrow-alt-right ml-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card border-0 rounded-0 p-lg-4 bg-light">
                    <div className="card-body">
                      <h5 className="text-uppercase mb-4">Cart total</h5>
                      <ul className="list-unstyled mb-0">
                        <li className="d-flex align-items-center justify-content-between">
                          <strong className="text-uppercase small font-weight-bold">
                            Total Medicine
                          </strong>
                          <span className="text-muted small">
                          {carts.length}
                          </span>
                        </li>
                        <li className="d-flex align-items-center justify-content-between">
                          <strong className="text-uppercase small font-weight-bold">
                            Subtotal
                          </strong>
                          <span className="text-muted small">
                          <span>${cartTotalPrice}</span>
                          </span>
                        </li>
                        <li className="border-bottom my-2"></li>
                        <li className="d-flex align-items-center justify-content-between mb-4">
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
