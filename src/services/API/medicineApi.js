import axios from "axios";
import {
  createMedicineFailed,
  createMedicineStart,
  createMedicineSuccess,
  deleteMedicineFailed,
  deleteMedicineStart,
  deleteMedicineSuccess,
  getMedicineDetailFailed,
  getMedicineDetailStart,
  getMedicineDetailSuccess,
  getMedicineFailed,
  getMedicineFilterFailed,
  getMedicineFilterStart,
  getMedicineFilterSuccess,
  getMedicinePanigationFailed,
  getMedicinePanigationStart,
  getMedicinePanigationSuccess,
  getMedicineStart,
  getMedicineSuccess,
} from "../../redux/medicineSlice";
import { DOMAIN } from "../../settings/config";

export const getListMedicine = async (dispatch, params) => {
    dispatch(getMedicineStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/medicines`, { params });
    dispatch(getMedicineSuccess(response.data));

  } catch (err) {
    dispatch(getMedicineFailed(err));
  }
};

export const getListMedicinePanigation = async (dispatch, params) => {
  dispatch(getMedicinePanigationStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/medicines/${params}`);
    dispatch(getMedicinePanigationSuccess(response.data));
  } catch (err) {
    dispatch(getMedicinePanigationFailed(err));
  }
};

export const getListMedicineFilter = async (dispatch, params) => {
  dispatch(getMedicineFilterStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/medicines/${params}`);
    dispatch(getMedicineFilterSuccess(response.data));
  } catch (err) {
    dispatch(getMedicineFilterFailed(err));
  }
};

export const getMedicineById = async (dispatch, id) => {
  dispatch(getMedicineDetailStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/medicines/${id}`);
    dispatch(getMedicineDetailSuccess(response.data));
  } catch (err) {
    dispatch(getMedicineDetailFailed(err.response.data));
  }
};

export const createMedicine = async (dispatch, params) => {
  dispatch(createMedicineStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/medicines`, params);
    dispatch(createMedicineSuccess());
  } catch (err) {
    dispatch(createMedicineFailed(err));
  }
};

export const deleteMedicine = async (dispatch, id) => {
  dispatch(deleteMedicineStart());
  try {
    await axios.delete(`${DOMAIN}/api/v1/medicines/${id}`);
    dispatch(deleteMedicineSuccess());
  } catch (err) {
    dispatch(deleteMedicineFailed(err));
  }
};
