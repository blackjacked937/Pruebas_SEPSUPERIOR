import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './routes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {

  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ marginTop: "70px" }}
      />
    </AuthProvider>
    
  );
}

export default App;
