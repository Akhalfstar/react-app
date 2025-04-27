import React, { useState } from 'react';
import { Link } from 'react-router';
import { Mail } from 'lucide-react';
import AuthLayout from '../auth/AuthLayout';
import FormInput from '../auth/FormInput';
import Button from '../ui/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
        console.log('Reset password request for:', email);
        // Here you would handle the actual password reset logic
      }, 1500);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email and we'll send you a link to reset your password"
    >
      {isSubmitted ? (
        <div className="text-center py-8 space-y-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg 
              className="h-6 w-6 text-green-600" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Check your email
          </h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            We've sent a password reset link to <strong>{email}</strong>. 
            The link will expire in 24 hours.
          </p>
          <div className="mt-6">
            <Button variant="outline" as={Link} to="/login">
              Back to login
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-8">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-amber-600 hover:text-amber-500 underline"
            >
              try again
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Email Address"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            placeholder="youremail@example.com"
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            autoComplete="email"
            required
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            loading={loading}
          >
            Send Reset Link
          </Button>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link 
                to="/login" 
                className="font-medium text-amber-600 hover:text-amber-500 transition-colors"
              >
                Back to login
              </Link>
            </p>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;