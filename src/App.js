import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductCatalog from './pages/ProductCatalog';
import Cart from './pages/Cart';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/CartContext'; 
import { useLocation } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        <Main />
      </Router>
    </CartProvider>
  );
}

function Main() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header if not on login or signup pages */}
      {!isAuthPage && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Private Routes */}
          <Route 
            path="/products" 
            element={
              <PrivateRoute>
                <ProductCatalog />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            } 
          />
          
        </Routes>
      </main>
      
      
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
