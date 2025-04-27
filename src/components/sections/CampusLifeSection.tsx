import React from "react";

const CampusLifeSection: React.FC = () => {
  const campusFeatures = [
    {
      id: "1",
      title: "Modern Facilities",
      description: "Access to state-of-the-art laboratories, libraries, and learning spaces.",
      image: "https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: "2",
      title: "Student Housing",
      description: "Comfortable and secure on-campus accommodation options.",
      image: "https://images.pexels.com/photos/1001944/pexels-photo-1001944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: "3",
      title: "Sports & Recreation",
      description: "Diverse sports facilities and recreational activities for a balanced lifestyle.",
      image: "https://images.pexels.com/photos/8412228/pexels-photo-8412228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      id: "4",
      title: "Student Organizations",
      description: "Over 50 student-led clubs and organizations to explore your interests.",
      image: "https://images.pexels.com/photos/6147176/pexels-photo-6147176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
            Campus Life Experience
          </h2>
          <div className="h-1 w-20 bg-[#8B0000] mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Discover the vibrant and diverse student life that makes our university 
            a home away from home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campusFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group relative rounded-lg overflow-hidden h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${feature.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-white text-xl font-bold mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.description}
                </p>
                <a
                  href={`/campus-life/${feature.id}`}
                  className="inline-block text-white border-b border-white/60 hover:border-white pb-1 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/campus-life"
            className="inline-block bg-[#0A2463] hover:bg-[#051845] text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Explore Campus Life
          </a>
        </div>
      </div>
    </section>
  );
};

export default CampusLifeSection;