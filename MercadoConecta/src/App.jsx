import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/providers/authContext';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Maps from './pages/Maps';
import FavoriteCommercers from './pages/FavoriteCommercers';
import Commerce from './pages/Commerce';
import Profile from './pages/Profile';
import YourCommerce from './pages/YourCommerce';
import ProfileCommerce from './pages/ProfileCommerce';
import SearchResult from './pages/SearchResult';

// ❗ Si RedirectByRole está interfiriendo, coméntalo o ajústalo
// import RedirectByRole from './components/RedirectByRole';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />

        {/* Si necesitas redirecciones automáticas por rol, descomenta esto */}
        {/* <RedirectByRole /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/maps' element={<Maps />} />
          <Route path='/favoriteCommercers' element={<FavoriteCommercers />} />
          <Route path='/commerce' element={<Commerce />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/your-commerce' element={<YourCommerce />} />
          <Route path='/profile-commerce' element={<ProfileCommerce />} />
          <Route path='/search-resut' element={<SearchResult />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;