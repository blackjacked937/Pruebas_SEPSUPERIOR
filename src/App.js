import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './routes';

function App() {

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
