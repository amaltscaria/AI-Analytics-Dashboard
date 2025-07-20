import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;