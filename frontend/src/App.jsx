import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import Login from "./pages/Login";
// import Dashboard from './pages/Dashboard';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            /> */}
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "rgba(0,0,0,0.8)",
                color: "#fff",
                backdropFilter: "blur(10px)",
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
