import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Film, LogIn } from 'lucide-react';
import { AnimatedBg } from '@/components/AnimatedBg';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: isLogin ? "Login failed" : "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: isLogin ? "Login Successful!" : "Sign up successful!",
          description: isLogin ? "Welcome back!" : "Please check your email to confirm your account.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <AnimatedBg />
      <div className="w-full max-w-xs sm:max-w-md bg-slate-900/60 backdrop-blur-xl border border-cyan-400/20 rounded-3xl shadow-2xl shadow-cyan-500/10 text-white transition-all duration-500">
        <div className="p-4 sm:p-8 text-center">
          <Link to="/" className="flex items-center justify-center gap-3 group mb-4 sm:mb-6">
            <img src="/logo.png" alt="ReelVault Logo" className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform" />
            <span className="text-xl sm:text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">ReelVault</span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-500 text-transparent bg-clip-text mb-1 sm:mb-2">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">{isLogin ? 'Sign in to access your vault.' : 'Join us to start building your reel library.'}</p>
        </div>
        
        <div className="px-4 sm:px-8 pb-6 sm:pb-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium text-cyan-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800/60 border-2 border-slate-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm sm:text-base"
                required
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="password" className="text-xs sm:text-sm font-medium text-cyan-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/60 border-2 border-slate-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm sm:text-base"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-pink-600 text-white font-bold text-base sm:text-lg py-2.5 sm:py-3 rounded-lg shadow-lg shadow-pink-500/20 hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300 ease-in-out transform disabled:opacity-50 disabled:scale-100"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs sm:text-sm text-cyan-300 hover:text-cyan-100 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
