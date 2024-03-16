import { createSlice } from "@reduxjs/toolkit";

const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    medicines: {
      allMedicine: null,
      isFetching: false,
      error: false,
    },
    medicineDetail: {
      medicine: null,
      isFetching: false,
      error: false,
    },
    medicinePanigation: {
      allMedicinePanigation: null,
      isFetching: false,
      error: false,
    },
    medicineFilter: {
      allMedicineFilter: null,
      isFetching: false,
      error: false,
    },
    createMedicine: {
      isFetching: false,
      error: false,
      isSuccess: false,
    },
    deleteMedicine: {
      isFetching: false,
      error: false,
      isSuccess: false,
    },
  },
  reducers: {
    getMedicineStart: (state) => {
      state.medicines.isFetching = true;
    },
    getMedicineSuccess: (state, action) => {
      state.medicines.isFetching = false;
      state.medicines.allMedicine = action.payload;
    },
    getMedicineFailed: (state) => {
      state.medicines.isFetching = false;
      state.medicines.error = true;
    },
    getMedicineDetailStart: (state) => {
      state.medicineDetail.isFetching = true;
    },
    getMedicineDetailSuccess: (state, action) => {
      state.medicineDetail.isFetching = false;
      state.medicineDetail.medicine = action.payload;
    },
    getMedicineDetailFailed: (state) => {
      state.medicineDetail.isFetching = false;
      state.medicineDetail.error = true;
    },
    getMedicinePanigationStart: (state) => {
      state.medicinePanigation.isFetching = true;
    },
    getMedicinePanigationSuccess: (state, action) => {
      state.medicinePanigation.isFetching = false;
      state.medicinePanigation.allMedicinePanigation = action.payload;
    },
    getMedicinePanigationFailed: (state) => {
      state.medicinePanigation.isFetching = false;
      state.medicinePanigation.error = true;
    },
    getMedicineFilterStart: (state) => {
      state.medicineFilter.isFetching = true;
    },
    getMedicineFilterSuccess: (state, action) => {
      state.medicineFilter.isFetching = false;
      state.medicineFilter.allMedicineFilter = action.payload;
    },
    getMedicineFilterFailed: (state) => {
      state.medicineFilter.isFetching = false;
      state.medicineFilter.error = true;
    },
    createMedicineStart: (state) => {
      state.createMedicine.isFetching = true;
    },
    createMedicineSuccess: (state) => {
      state.createMedicine.isFetching = false;
      state.createMedicine.isSuccess = true;
    },
    createMedicineFailed: (state) => {
      state.createMedicine.isFetching = false;
      state.createMedicine.error = true;
    },
    deleteMedicineStart: (state) => {
      state.deleteMedicine.isFetching = true;
    },
    deleteMedicineSuccess: (state) => {
      state.deleteMedicine.isFetching = false;
      state.deleteMedicine.isSuccess = true;
    },
    deleteMedicineFailed: (state) => {
      state.deleteMedicine.isFetching = false;
      state.deleteMedicine.error = true;
    },
  },
});

export const {
  getMedicineStart,
  getMedicineSuccess,
  getMedicineFailed,
  getMedicineDetailStart,
  getMedicineDetailSuccess,
  getMedicineDetailFailed,
  getMedicinePanigationStart,
  getMedicinePanigationSuccess,
  getMedicinePanigationFailed,
  getMedicineFilterStart,
  getMedicineFilterSuccess,
  getMedicineFilterFailed,
  createMedicineStart,
  createMedicineSuccess,
  createMedicineFailed,
  deleteMedicineStart,
  deleteMedicineSuccess,
  deleteMedicineFailed,
} = medicineSlice.actions;

export default medicineSlice.reducer;
