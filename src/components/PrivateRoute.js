import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return currentUser ? children : <Navigate to="/" />;
}

export default PrivateRoute;
