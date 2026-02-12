import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from '../../api/axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/UserSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('/auth/signin', {
        username: data.identifier,
        email: data.identifier,
        password: data.password,
      });

      const { user, accessToken } = response.data.data;
      localStorage.setItem('token', accessToken);
      dispatch(setUserData(user));

      toast.success('Login Successful');

      setTimeout(() => {
        navigate('/');
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

      const response = await axios.post('/auth/google-login', {
        idToken,
      });

      const { user, accessToken } = response.data.data;
       
      localStorage.setItem('token', accessToken);
      
      dispatch(setUserData(user));

      toast.success('Login Successful');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || 'Google signin failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs bg-white border border-[#E5E5E5] 
                   rounded-2xl px-6 pt-6 pb-4 shadow-sm"
      >
        {/* Title */}
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold text-[#0D0D0D]">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to continue to Nextnote
          </p>
        </div>

        {/* Google Sign In */}
        <button
          className="w-full flex items-center justify-center gap-2 
                     border border-[#E5E5E5] rounded-lg py-2 
                     text-sm font-medium text-[#0D0D0D] 
                     hover:bg-gray-50 transition"
          onClick={handleGoogleAuth}
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
          {/* Email or Username */}
          <div>
            <label className="text-sm font-medium text-[#0D0D0D]">
              Email or Username
            </label>
            <div className="mt-1 relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                {...register('identifier')}
                type="text"
                placeholder="Enter your email or username"
                className="w-full pl-10 pr-3 py-2 border border-[#E5E5E5] 
                           rounded-lg text-sm focus:outline-none 
                           focus:ring-2 focus:ring-[#0D0D0D]/20 
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
                placeholder="Enter your password"
                className="w-full pl-10 pr-3 py-2 border border-[#E5E5E5] 
                           rounded-lg text-sm focus:outline-none 
                           focus:ring-2 focus:ring-[#0D0D0D]/20 
                           transition"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-2">
              <Link
                to="/auth/forgot-password"
                className="text-xs text-gray-500 hover:text-[#0D0D0D] transition"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0D0D0D] text-white 
                       py-2 rounded-lg text-sm font-medium 
                       hover:opacity-90 transition mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-sm text-center text-gray-500 mt-3">
          Don’t have an account?{' '}
          <Link
            to="/auth/register"
            className="text-[#0D0D0D] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
