import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddNote from "./pages/addNote/AddNote";
import View from "./pages/showNote/View";
import Edit from "./pages/showNote/components/Edit";
import './global.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Routes>
          <Route path="/" element={<View />}></Route>
          <Route path="/post" element={<AddNote />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
export const baseUrl = "https://note-api-cbkb.onrender.com/"
