import { Link } from 'react-router-dom';
import { TrendingUp, Users, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen pt-16" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[90vh] px-4">
        <div className="max-w-4xl mx-auto text-center fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-heading">
            Welcome To Demo
          </h1>
          <p className="text-base sm:text-lg text-[#C7C9D3] mb-10 max-w-2xl mx-auto" data-testid="hero-subtext">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit possimus architecto ducimus. Inventore minima veniam unde illo, sit provident consequatur consectetur quidem eius.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/hierarchy"
              className="bg-[#00E6C3] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[#00BFA0] transition-all inline-block"
              data-testid="explore-chart-btn"
            >
              Explore Chart
            </Link>
            <button
              className="border border-gray-400 text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition-all"
              data-testid="learn-more-btn"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative blur orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#00E6C3] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00E6C3] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="stats-section">
          <div className="glass-strong rounded-2xl p-8 text-center card-hover" data-testid="stat-organizations">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#00E6C3] bg-opacity-20 rounded-full flex items-center justify-center">
                <TrendingUp size={32} className="text-[#00E6C3]" />
              </div>
            </div>
            <h3 className="text-4xl font-bold mb-2">100+</h3>
            <p className="text-[#C7C9D3]">Organizations</p>
          </div>

          <div className="glass-strong rounded-2xl p-8 text-center card-hover" data-testid="stat-users">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#00E6C3] bg-opacity-20 rounded-full flex items-center justify-center">
                <Users size={32} className="text-[#00E6C3]" />
              </div>
            </div>
            <h3 className="text-4xl font-bold mb-2">50K+</h3>
            <p className="text-[#C7C9D3]">Users</p>
          </div>

          <div className="glass-strong rounded-2xl p-8 text-center card-hover" data-testid="stat-uptime">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#00E6C3] bg-opacity-20 rounded-full flex items-center justify-center">
                <Zap size={32} className="text-[#00E6C3]" />
              </div>
            </div>
            <h3 className="text-4xl font-bold mb-2">99.9%</h3>
            <p className="text-[#C7C9D3]">Uptime</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
