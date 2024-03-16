import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import publicRoutes from "./Routes/routes";
import adminRoutes from "./Routes/adminRoutes";
import DefaultLayout from "./Layouts/DefaultLayout";
import AdminLayout from "./Layouts/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes>
              {publicRoutes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <DefaultLayout>
                        <Component />
                      </DefaultLayout>
                    }
                  ></Route>
                );
              })}
              {adminRoutes.map((route, index) => {
                const Component = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <AdminLayout>
                        <Component />
                      </AdminLayout>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </PersistGate>
        </Provider> 
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
