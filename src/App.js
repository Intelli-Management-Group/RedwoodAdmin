// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Media from './pages/Media/Media';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuthProvider } from './pages/Component/AuthContext/AuthContextComponents';
import AuthProtectedRoute from './pages/Component/AuthContext/AuthProtectedRoute';
import Post from './pages/Post/Post';
import CreatePost from './pages/CreatePost/CreatePost';
import Pages from "./pages/Pages/Pages";
import Users from "./pages/Users/Users";
import CreatePages from "./pages/CreatPages/CreatePages";
import UserManagement from './pages/Users/UserManagement';
import UserProfile from './pages/Profile/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AuthProtectedRoute>
                <Dashboard />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/media"
            element={
              <AuthProtectedRoute>
                <Media />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <AuthProtectedRoute>
                <Post />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/pages"
            element={
              <AuthProtectedRoute>
                <Pages />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <AuthProtectedRoute>
                <Users />
              </AuthProtectedRoute>
            }
          />
           <Route
            path="/usersManagement"
            element={
              <AuthProtectedRoute>
                <UserManagement />
              </AuthProtectedRoute>
            }
          />
           <Route
            path="/post/create"
            element={
              <AuthProtectedRoute>
                <CreatePost />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/uploadDocument"
            element={
              <AuthProtectedRoute>
                <CreatePages />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthProtectedRoute>
                <UserProfile />
              </AuthProtectedRoute>
            }
          />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
