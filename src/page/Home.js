import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function Home() {
  

  return (
    <div className="page-holder">
      <div className="header bg-red">
        <div className="container">
          <div
            className="hero pb-3 bg-cover bg-center d-flex align-items-center"
            style={{
              backgroundImage: `url("/image/banner1.jpg")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container py-5">
              <div className="row px-4 px-lg-5">
                <div className="col-lg-6">
                  <p className="text-muted small text-uppercase mb-2">
                  Where Quality Meets Care
                  </p>
                  <h1 className="h3 text-uppercase mb-3">
                  Welcome To A World Of Wellness,<br /> 
                  Where Health Meets Happiness!
                  </h1>
                  <a className="btn btn-dark" href="shop">
                    Browse Medicine
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="text-center">
              <p className="small text-muted small text-uppercase mb-1">
                Carefully created collections
              </p>
              <h2 className="h5 text-uppercase mb-4">Browse our Top Medicine Categories</h2>
            </div>
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <NavLink className="category-item" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-1.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Pain Killers</strong>
                </NavLink>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <NavLink className="category-item mb-4" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-2.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Antibiotics</strong>
                </NavLink>
                <NavLink className="category-item" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-3.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Vitamins</strong>
                </NavLink>
              </div>
              <div className="col-md-4">
                <NavLink className="category-item" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-4.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Digestive Aids</strong>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="py-5" id="section_product">
            <div>
              <p className="small text-muted small text-uppercase mb-1">
                Made the hard way
              </p>
              <h2 className="h5 text-uppercase mb-4">Big Discount Medicine</h2>
            </div>
            {/* <div className="row d-block">
              <ProductBigSale productDiscount={productDiscount} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
