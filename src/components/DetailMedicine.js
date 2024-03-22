import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { incrementItem } from "../redux/cartSlice";
import { getListMedicine, getMedicineById } from "../services/API/medicineApi";
import MedicineForYou from "./MedicineForYou";
import { toast } from "react-toastify";

export default function DetailMedicine() {
  const { id } = useParams();
  const medicine = useSelector((state) => state.medicine.medicineDetail?.medicine);
  
  const listMedicine = useSelector(
    (state) => state.medicine.medicines?.allMedicine
  );
  const customer = useSelector((state) => state.auth.login.currentCustomer);
  
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    getMedicineById(dispatch, id);
  }, []);

  useEffect(() => {
    getListMedicine(dispatch);
  }, []);

  const decrementQuantity = () => {
    if (quantity <= 1) {
      toast.warn("At Least Must Be One Medicine", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // return;
    } else {
      setQuantity((value) => value - 1);
      toast.success("Delete Medicine Success", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const incrementQuantity = () => {
    setQuantity((value) => value + 1);
    toast.success("Add Medicine Success", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onChangeText = (value) => {
    quantity(value);
  };

  const handleAddToCart = (medicine, quantity) => {
    dispatch(incrementItem({ medicine, quantity }));
    toast.success("Add Medicine To Cart Success", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };  


  return (
    <div className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="row m-sm-0">
              <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                <div
                  className="owl-thumbs d-flex flex-row flex-sm-column"
                  data-slider-id="1"
                >
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img
                      className="w-100"
                      
                      src={`/image/${medicine?.img1}`}
                      alt={medicine?.img1}
                    />
                  </div>
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img
                      className="w-100"
                      src={`/image/${medicine?.img1}`}
                      alt={medicine?.img1}
                    />
                  </div>
                </div>
              </div>
              <div
                id="carouselExampleControls"
                className="carousel slide col-sm-10 order-1 order-sm-2"
                data-ride="carousel"
              >
                <div className="carousel-inner owl-carousel product-slider">
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      src={`/image/${medicine?.img1}`}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src={`/image/${medicine?.img1}`}
                      alt="Second slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="list-inline mb-2">
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
            </ul>
            <h1>{medicine?.name}</h1>
            <p className="text-muted lead">${medicine?.price}</p>
            <p className="text-small mb-4">{medicine?.description}</p>
            <div className="row align-items-stretch mb-4">
              <div className="col-sm-5 pr-sm-0">
                <div className="border d-flex align-items-center justify-content-between px-3 bg-white border-black">
                  <span className="small text-uppercase text-gray mr-4 no-select">
                    Quantity
                  </span>
                  <div className="quantity">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fas fa-caret-left"
                        onClick={() => decrementQuantity()}
                      ></i>
                    </button>
                    <input
                      className="form-control border-0 shadow-0 p-0"
                      type="text"
                      onChange={(e) => onChangeText(e.target.value)}
                      value={quantity}
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fas fa-caret-right"
                        onClick={() => incrementQuantity()}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 pl-sm-0">
                <button
                  className="btn btn-dark btn-md btn-block d-flex align-items-center justify-content-center px-0 text-white ml-2"
                  onClick={() => handleAddToCart(medicine, quantity)}
                >
                  Add to cart
                </button>
              </div>
              <a className="btn btn-link text-dark p-1 mb-4" href="#">
                <i className="far fa-heart mr-2"></i>Add to wish list
              </a>
              <br></br>
              <ul className="list-unstyled small d-inline-block">
                <li className="px-3 py-2 mb-1 bg-white text-muted">
                  <strong className="text-uppercase text-dark">
                    Category:
                  </strong>
                  <a className="reset-anchor ml-2">{medicine?.category}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="d-flex justify-content-between">
          
          {/* <div>
            <button
              className="btn btn-dark btn-sm btn-block px-0 text-white"
              style={{ width: "12rem" }}
              onClick={() => handleComment()}
            >
              Send
            </button>
          </div> */}
        </div>
        <br />
        
        <h2 className="h5 text-uppercase mb-4">Related medicines</h2>
        <div className="row d-block">
          <MedicineForYou listMedicine={listMedicine} />
        </div>
      </div>
    </div>
  );
}
