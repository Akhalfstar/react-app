import { useState } from 'react';
import { Link , useNavigate  } from 'react-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import AuthLayout from '../auth/AuthLayout';
import FormInput from '../auth/FormInput';
import Button from '../ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (1) {
      setLoading(true);

      try {
        // Send a POST request using fetch
        const response = await fetch('http://localhost:5000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies are sent with the request
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Assuming the backend sends the cookies automatically
          // You can also extract data if necessary
          const data = await response.json();
          console.log(data);  // You can log the response if needed
          navigate('/');  // Redirect to the home page or dashboard
        } else {
          const errorData = await response.json();
          setErrors({ general: errorData.message });
        }
      } catch (err) {
        setLoading(false);
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to access your Real Estate account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Email Address"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="youremail@example.com"
          icon={<Mail className="w-5 h-5 text-gray-400" />}
          autoComplete="email"
          required
        />

        <div className="relative">
          <FormInput
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading}>
          Sign in
        </Button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
