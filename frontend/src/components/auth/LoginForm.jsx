import { useState } from "react";
import { Shield } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import AuthHeader from "./AuthHeader.jsx";
import Input from "../ui//Input.jsx";
import Button from "../ui/Button.jsx";
import {motion} from 'framer-motion';
const {div: MotionDiv} = motion;

const LoginForm = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = isLogin
        ? await login(formData.email, formData.password)
        : await register(formData.username, formData.email, formData.password);

      if (result.success) {
        toast.success(
          isLogin ? "Welcome back!" : "Account created successfully!"
        );
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <>
      <AuthHeader isLogin={isLogin} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Input
              label="Username"
              value={formData.username}
              onChange={handleInputChange("username")}
              placeholder="Enter your username"
              required={!isLogin}
            />
          </MotionDiv>
        )}

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          value={formData.password}
          onChange={handleInputChange("password")}
          placeholder="Enter your password"
          required
          showPasswordToggle
        />

        <Button type="submit" loading={loading}>
          {loading
            ? isLogin
              ? "Signing in..."
              : "Creating account..."
            : isLogin
            ? "Sign In"
            : "Create Account"}
        </Button>
      </form>

      {/* Toggle between login/register */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="text-blue-400 font-semibold">
            {isLogin ? "Sign up" : "Sign in"}
          </span>
        </button>
      </div>

      {/* Security badge */}
      <div className="mt-6 flex items-center justify-center text-gray-500 text-sm">
        <Shield size={16} className="mr-1" />
        Secured with enterprise-grade encryption
      </div>
    </>
  );
};

export default LoginForm;
