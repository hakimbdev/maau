import React from "react";
import { ChevronRight } from "lucide-react";
import { programs } from "../../data/programs";

const ProgramsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
            Academic Programs
          </h2>
          <div className="h-1 w-20 bg-[#8B0000] mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Discover our comprehensive range of undergraduate and graduate programs 
            designed to prepare you for success in your chosen field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-white/80 text-sm">{program.faculty}</span>
                    <h3 className="text-white text-xl font-semibold">{program.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-[#E6F2FF] text-[#0A2463] px-3 py-1 rounded-full text-sm font-medium">
                    {program.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {program.description}
                </p>
                <a
                  href={`/academics/programs/${program.id}`}
                  className="flex items-center text-[#8B0000] font-medium hover:text-[#700000] transition-colors"
                >
                  Learn More
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/academics/programs"
            className="inline-block bg-[#0A2463] hover:bg-[#051845] text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Programs
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;