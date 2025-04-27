import React from "react";
import { faculty } from "../../data/faculty";

const FacultySection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
            Meet Our Distinguished Faculty
          </h2>
          <div className="h-1 w-20 bg-[#8B0000] mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Our world-class faculty brings expertise, experience, and dedication 
            to provide students with outstanding education and mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member) => (
            <div 
              key={member.id}
              className="bg-gray-50 rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0A2463] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#8B0000] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.department}</p>
                <a
                  href={`/faculty/${member.id}`}
                  className="text-sm text-[#0A2463] hover:text-[#051845] font-medium"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="/faculty"
            className="inline-block border-2 border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463] hover:text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Faculty
          </a>
        </div>
      </div>
    </section>
  );
};

export default FacultySection;