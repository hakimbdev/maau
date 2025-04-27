import React from "react";
import { ArrowRight, BookOpen, Users, Award, Globe } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#0A2463] to-[#1E3A8A] text-white min-h-screen flex items-center pt-24 pb-32">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15
        }}
      ></div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
          {/* Left Column - Main Content */}
          <div className="w-full lg:w-3/5">
            <div className="relative">
              {/* Decorative elements positioned to not overlap text */}
              <div className="absolute -left-4 -top-4 w-16 h-16 bg-[#FFC857] rounded-full opacity-20 hidden md:block"></div>
              <div className="absolute -right-10 bottom-0 w-24 h-24 bg-[#FFC857] rounded-full opacity-20 hidden md:block"></div>

              {/* Main heading with proper spacing */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 relative z-10">
                Shaping Tomorrow's{" "}
                <span className="text-[#FFC857]">Leaders</span> Today
              </h1>

              {/* Description with controlled width */}
              <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl">
                Experience world-class education at Maryam Abacha American University with cutting-edge research,
                distinguished faculty, and a vibrant campus community that fosters innovation
                and excellence.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <a href="/about" className="bg-white text-[#0A2463] hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center">
                  Explore Programs
                  <ArrowRight size={18} className="ml-2" />
                </a>
                <a href="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-md font-semibold transition-colors">
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Features Card */}
          <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-[#FFC857]">Why Choose MAAU?</h2>
              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFC857] p-3 rounded-lg flex-shrink-0">
                    <Award className="text-[#0A2463] h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Academic Excellence</h3>
                    <p className="text-gray-300 text-sm md:text-base">Nationally recognized programs with experienced faculty</p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFC857] p-3 rounded-lg flex-shrink-0">
                    <Users className="text-[#0A2463] h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Diverse Community</h3>
                    <p className="text-gray-300 text-sm md:text-base">A welcoming environment for students from all backgrounds</p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFC857] p-3 rounded-lg flex-shrink-0">
                    <Globe className="text-[#0A2463] h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">Global Opportunities</h3>
                    <p className="text-gray-300 text-sm md:text-base">International partnerships and exchange programs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Positioned with enough space from content */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all">
              <p className="text-2xl md:text-4xl font-bold text-[#FFC857] mb-1">12,000+</p>
              <p className="text-gray-200 text-sm md:text-base font-medium">Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all">
              <p className="text-2xl md:text-4xl font-bold text-[#FFC857] mb-1">800+</p>
              <p className="text-gray-200 text-sm md:text-base font-medium">Faculty</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all">
              <p className="text-2xl md:text-4xl font-bold text-[#FFC857] mb-1">50+</p>
              <p className="text-gray-200 text-sm md:text-base font-medium">Programs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 transform hover:scale-105 transition-all">
              <p className="text-2xl md:text-4xl font-bold text-[#FFC857] mb-1">85%</p>
              <p className="text-gray-200 text-sm md:text-base font-medium">Employment Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;