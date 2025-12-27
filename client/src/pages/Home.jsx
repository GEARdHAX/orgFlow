import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  ArrowRight,
  Shield,
  Globe,
  Rocket,
  Sparkles,
  BarChart3,
  Cpu,
  Lock,
  CheckCircle,
  Star,
  Target,
  Award,
  TrendingDown,
  Users2,
  Clock,
  Zap as Lightning,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  const features = [
    { icon: <Shield size={22} />, title: "Enterprise Security", desc: "Bank-level encryption & compliance" },
    { icon: <Globe size={22} />, title: "Global Scale", desc: "Support for distributed teams worldwide" },
    { icon: <Cpu size={22} />, title: "Smart Automation", desc: "AI-powered insights & automation" },
    { icon: <BarChart3 size={22} />, title: "Real-time Analytics", desc: "Live data visualization & reporting" },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CTO at TechCorp", quote: "Transformed our org structure overnight.", company: "TechCorp" },
    { name: "Marcus Rivera", role: "HR Director", quote: "Cut onboarding time by 70%.", company: "Global Inc" },
    { name: "Elena Petrova", role: "Operations Lead", quote: "The interface is pure magic.", company: "StartupXYZ" },
  ];

  return (
    <div className="min-h-screen pt-16 overflow-hidden" data-testid="home-page">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 mb-6">
                <Sparkles size={16} className="text-teal-400" />
                <span className="text-teal-400 text-sm font-medium">Next-Gen Platform</span>
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" data-testid="hero-heading">
                Organize Your
                <span className="block">Team with <span className="relative">
                  Precision
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
                </span></span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed" data-testid="hero-subtext">
                Transform your organizational structure with our AI-powered platform. Visualize hierarchies, streamline workflows, and boost productivity in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link
                  to="/hierarchy"
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-3"
                  data-testid="explore-chart-btn"
                >
                  <Rocket size={20} />
                  <span>Explore Interactive Chart</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <button
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl border-2 border-slate-700/50 bg-slate-900/30 backdrop-blur-sm text-white font-semibold hover:border-slate-600/50 transition-all duration-300 inline-flex items-center justify-center gap-3"
                  data-testid="learn-more-btn"
                >
                  <span>Watch Demo</span>
                  <div className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-teal-500 transition-colors">
                    <svg className="w-3 h-3 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 border-2 border-slate-900"></div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">Trusted by 10,000+ teams</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-slate-500 ml-2">4.9/5 rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <div className="rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm p-8 hover:border-teal-500/30 transition-all duration-500 group">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Target size={24} className="text-teal-400" />
                      </div>
                      <h3 className="text-5xl font-bold text-white mb-2">98%</h3>
                      <p className="text-slate-400">User Satisfaction</p>
                    </div>
                    <TrendingUp size={24} className="text-green-400" />
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6 hover:border-blue-500/30 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users2 size={20} className="text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">100K+</h3>
                <p className="text-sm text-slate-400">Active Users</p>
                <div className="flex items-center gap-1 mt-3">
                  <TrendingUp size={14} className="text-green-400" />
                  <span className="text-xs text-green-400">+12% this month</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock size={20} className="text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">99.9%</h3>
                <p className="text-sm text-slate-400">Uptime SLA</p>
                <div className="flex items-center gap-1 mt-3">
                  <CheckCircle size={14} className="text-green-400" />
                  <span className="text-xs text-green-400">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 mb-4">
              <Award size={16} className="text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Everything You Need to <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Succeed</span></h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">Built for modern teams that need powerful tools without complexity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-8 hover:border-teal-500/50 hover:bg-slate-900/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-teal-400">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 mb-6">{feature.desc}</p>
                  <div className="flex items-center text-teal-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Learn more</span>
                    <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Stats Section */}
          <div className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                      <TrendingUp size={24} className="text-teal-400" />
                    </div>
                  </div>
                  <h3 className="text-5xl font-bold text-white mb-2">150+</h3>
                  <p className="text-slate-400 text-lg">Global Organizations</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                    <TrendingUp size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">+25% YoY growth</span>
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                      <Users size={24} className="text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-5xl font-bold text-white mb-2">50K+</h3>
                  <p className="text-slate-400 text-lg">Active Team Members</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                    <Users2 size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">+500 this week</span>
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Lightning size={24} className="text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-5xl font-bold text-white mb-2">99.99%</h3>
                  <p className="text-slate-400 text-lg">System Uptime</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">Zero downtime in 2024</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Ready to transform your organization?</h4>
                    <p className="text-slate-400">Join thousands of successful teams already using our platform</p>
                  </div>
                  <Link
                    to="/login"
                    className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3 whitespace-nowrap"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 mb-4">
              <Star size={16} className="text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Trusted By Leaders</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Loved by Teams <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Worldwide</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm p-8 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
                  "
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg text-slate-300 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-white font-bold">{testimonial.name.charAt(0)}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                    <p className="text-xs text-slate-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl translate-x-32 translate-y-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Elevate Your Organization?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Start your free trial today and experience the future of organizational management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="group relative overflow-hidden px-10 py-5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-3"
                >
                  <Rocket size={22} />
                  <span>Start Free Trial</span>
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <Link
                  to="/hierarchy"
                  className="group px-10 py-5 rounded-2xl border-2 border-slate-700/50 bg-slate-900/30 backdrop-blur-sm text-white font-semibold text-lg hover:border-teal-500/50 hover:bg-slate-900/50 transition-all duration-300 inline-flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Watch Demo</span>
                </Link>
              </div>
              <p className="text-slate-500 text-sm mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;