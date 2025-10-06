import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './routes';
import './App.css';

function App() {

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
