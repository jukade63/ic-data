import MainForm from "./components/MainForm";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
