
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LandingHome from './pages/LandingHome/home';

import Login from './pages/Login/login';
import Register from './pages/Register/register';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        
      <Route path="/" element={<LandingHome/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
