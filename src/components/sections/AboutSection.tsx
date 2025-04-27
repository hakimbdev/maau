import React from "react";
import { BookOpen, Target, Award, Users } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
            About MAAU
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            A premier institution dedicated to academic excellence and innovation since 1980
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 border-2 border-[#FFC857] rounded-lg"></div>
              <img
                src="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="University campus"
                className="rounded-lg shadow-xl w-full h-auto object-cover relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#FFC857] text-[#0A2463] p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-xl font-bold">Established 1980</p>
                <p>Excellence in Education</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#0A2463]">Our Story</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Founded in 1980, Maryam Abacha American University has grown from a small institution to
                one of the leading centers of higher education in the region. We pride ourselves
                on our commitment to academic excellence, research, and innovation.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                With a diverse community of students from across the globe, we offer a rich
                cultural experience and a supportive environment where students can thrive
                academically and personally.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#0A2463] hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <Target className="text-[#0A2463] mr-3 h-6 w-6" />
                    <h3 className="font-bold text-[#0A2463]">Our Vision</h3>
                  </div>
                  <p className="text-gray-700">
                    To be a leading institution in education, research, and innovation,
                    with global impact and local relevance.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#FFC857] hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <Award className="text-[#FFC857] mr-3 h-6 w-6" />
                    <h3 className="font-bold text-[#0A2463]">Our Mission</h3>
                  </div>
                  <p className="text-gray-700">
                    To nurture future leaders through comprehensive education, cutting-edge
                    research, and community engagement.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="/about"
                  className="inline-block bg-[#0A2463] hover:bg-[#051845] text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Key Facts */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="bg-[#0A2463] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2463] mb-3">Academic Programs</h3>
            <p className="text-gray-700">
              Offering over 50 undergraduate and graduate programs across various disciplines
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="bg-[#8B0000] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="text-white h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2463] mb-3">Student Life</h3>
            <p className="text-gray-700">
              A vibrant campus with over 30 student organizations and numerous cultural events
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
            <div className="bg-[#FFC857] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="text-[#0A2463] h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0A2463] mb-3">Research Excellence</h3>
            <p className="text-gray-700">
              Recognized for groundbreaking research with state-of-the-art facilities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;