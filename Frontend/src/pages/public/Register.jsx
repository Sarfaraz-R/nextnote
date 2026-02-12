import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/UserSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('/auth/signup', {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      const { user } = response.data.data;

      // dispatch(setUserData(user));

      toast.success('Registration successful! Please login.');

      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    } catch (error) {
      const backendError = error.response?.data;

      if (backendError?.errors) {
        Object.values(backendError.errors).forEach((msg) => toast.error(msg));
      } else {
        toast.error(backendError?.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post('/auth/google-registration', {
        idToken,
      });

      const { user } = response.data.data;

      // dispatch(setUserData(user));

      toast.success('Registration successful! Please login.');

      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4 pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-[#E5E5E5] 
                   rounded-2xl px-6 pt-6 pb-4 shadow-sm 
                   hover:shadow-md transition-shadow duration-300"
      >
        {/* Title */}
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold text-[#0D0D0D]">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start generating AI-powered notes and quizzes
          </p>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 
             border border-[#E5E5E5] rounded-lg py-2 
             text-sm font-medium text-[#0D0D0D] 
             hover:bg-gray-50 transition disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
          />
          {loading ? 'Processing...' : 'Continue with Google'}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-[#E5E5E5]" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-[#E5E5E5]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-[#0D0D0D]">
              Username
            </label>
            <div className="mt-1 relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                {...register('username')}
                type="text"
                placeholder="Enter your username"
                className="w-full pl-10 pr-3 py-2 border border-[#E5E5E5] 
                           rounded-lg text-sm focus:outline-none 
                           focus:ring-2 focus:ring-[#0D0D0D]/20 
                           focus:border-[#0D0D0D]
                           transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#0D0D0D]">Email</label>
            <div className="mt-1 relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border border-[#E5E5E5] 
                           rounded-lg text-sm focus:outline-none 
                           focus:ring-2 focus:ring-[#0D0D0D]/20 
                           focus:border-[#0D0D0D]
                           transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#0D0D0D]">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                {...register('password')}
                type="password"
                placeholder="Create a password"
                className="w-full pl-10 pr-3 py-2 border border-[#E5E5E5] 
                           rounded-lg text-sm focus:outline-none 
                           focus:ring-2 focus:ring-[#0D0D0D]/20 
                           focus:border-[#0D0D0D]
                           transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#0D0D0D] text-white 
                       py-2 rounded-lg text-sm font-medium 
                       hover:opacity-90 transition-all 
                       disabled:opacity-60 mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>

        {/* Sign In */}
        <p className="text-sm text-center text-gray-500 mt-3">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-[#0D0D0D] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
