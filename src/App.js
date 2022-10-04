import './App.css';
import Router from "./routes/index";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  offset: 200,
  duration: 900,
  once: true,
});
function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </>
  );
}

export default App;
