
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Wallet, PieChart, TrendingUp } from 'lucide-react';
import { signInWithGoogle } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  
  // Handle OAuth callback error
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      console.error('OAuth error:', error, errorDescription);
      toast({
        title: "Authentication Error",
        description: errorDescription || "Failed to sign in with Google.",
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      // Auth state change will be handled by the AuthProvider
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setLoading(true);
    // Simulate loading, then redirect to dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  if (authLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-primary rounded-lg p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-bold text-xl">BillTrix</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleDemo}>
            Try Demo
          </Button>
          <Button onClick={handleSignIn} disabled={loading}>
            {loading ? <Spinner size="sm" className="mr-2" /> : null}
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero section */}
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-12 md:py-24">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Take control of your finances with BillTrix
          </h1>
          <p className="text-lg text-muted-foreground">
            Track expenses, set goals, get AI-powered insights, and automate your financial life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={handleSignIn} disabled={loading}>
              {loading ? <Spinner size="sm" className="mr-2" /> : null}
              Get Started with Google
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={handleDemo}>
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&w=800&q=80"
              alt="BillTrix Dashboard"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Wallet className="h-8 w-8 text-primary" />,
                title: 'Expense Tracking',
                description: 'Automatically categorize and track all your expenses in one place.'
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-primary" />,
                title: 'Smart Budgeting',
                description: 'Create personalized budgets that adapt to your spending habits.'
              },
              {
                icon: <PieChart className="h-8 w-8 text-primary" />,
                title: 'Goal Setting',
                description: 'Set financial goals and track your progress with visual indicators.'
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-primary" />,
                title: 'AI Insights',
                description: 'Get personalized recommendations to optimize your finances.'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your finances?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who have improved their financial health with BillTrix.
          </p>
          <Button size="lg" onClick={handleSignIn} disabled={loading}>
            {loading ? <Spinner size="sm" className="mr-2" /> : null}
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted mt-auto py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="bg-primary rounded-lg p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                  <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-bold">BillTrix</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 BillTrix. All rights reserved.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
