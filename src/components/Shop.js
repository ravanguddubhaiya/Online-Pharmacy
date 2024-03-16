import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Medicines from "./Medicines";
import MedicineForYou from "./MedicineForYou";
import Pagination from "@mui/material/Pagination";
import queryString from "query-string";
import {
  getListMedicine,
  getListMedicineFilter,
  // getListMedicinePanigation,
} from "../services/API/medicineApi";
// import Search from "./Search";
import Sort from "./Sort";

export default function Shop() {
  
  const medicinePanigation = useSelector(
    (state) => state.medicine?.medicinePanigation?.allMedicinePanigation
  );

  const medicineFilter = useSelector(
    (state) => state.medicine?.medicineFilter?.allMedicineFilter
  );
  
  const listMedicine = useSelector(
    (state) => state.medicine.medicines?.allMedicine
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getListMedicine(dispatch);
  }, []);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("default");
  const [totalPage, setTotalPage] = useState();
  const [pagination, setPagination] = useState({
    page: "1",
    size: "9",
    search: "",
    category: "all",
  });
  

  const handleSort = (value) => {
    setSort(value);
  };

  return (
    <div className="container">
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">All the Medicines Are Listed</h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* -------------Modal Medicine----------------- */}
      <section className="py-5">
      <div className="py-5" id="section_product">
            
            <div className="row d-block">
              <MedicineForYou listMedicine={listMedicine} />
            </div>
          </div>
      </section>
    </div>
  );
}
