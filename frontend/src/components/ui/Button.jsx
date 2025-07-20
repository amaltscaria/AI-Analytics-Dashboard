import {motion} from 'framer-motion';
const {button: MotionButton} = motion;
const Button = ({
  children,
  type = "button",
  loading = false,
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-white/10 hover:bg-white/20 border border-white/20",
  };

  return (
    <MotionButton
      type={type}
      disabled={loading || disabled}
      className={`w-full text-white font-semibold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${variants[variant]} ${className}`}
      whileHover={{ scale: loading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          {children}
        </div>
      ) : (
        children
      )}
    </MotionButton>
  );
};

export default Button;
