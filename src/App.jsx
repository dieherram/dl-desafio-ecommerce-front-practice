import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Layout/Navigation'
import ProtectedRoute from './components/Auth/ProtectedRoute' // Import the ProtectedRoute component


import './main.css'
import SingIn from './components/Auth/SingIn';
import SingUp from './components/Auth/SingUp';
import Home from './pages/Home';
import ShoppingCart from './components/Cart/ShoppingCart';
import Notifications from './pages/Notifications';
import UserProfile from './pages/UserProfile';
import ManageProductsView from './pages/ManageProducts';

function App() {


  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          }
        />
        <Route
          path='/manage-products'
          element={
            <ProtectedRoute>
              <ManageProductsView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
          path="/sign-in"
          element={<SingIn />}
        />
        <Route
          path="/sign-up"
          element={<SingUp />}
        />
      </Routes>
    </div>
  );
}

export default App
