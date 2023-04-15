
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LandingHome from './pages/LandingHome/home';

import Login from './pages/Login/login';
import Register from './pages/Register/register';
import ProtectedPage from './components/ProtectedPage';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        
      <Route path="/" element= {<ProtectedPage>
       <LandingHome/>
      </ProtectedPage>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
