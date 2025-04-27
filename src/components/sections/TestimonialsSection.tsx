import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const prevTestimonial = () => {
    setActiveIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-[#0A2463] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-white"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Student Testimonials
          </h2>
          <div className="h-1 w-20 bg-[#FFC857] mx-auto mb-6"></div>
          <p className="text-gray-200 text-lg">
            Hear what our students and alumni have to say about their experience at our university.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center justify-center overflow-hidden">
            <div className="w-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-opacity duration-500 absolute w-full ${
                    index === activeIndex
                      ? 'opacity-100 z-10'
                      : 'opacity-0 -z-10'
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 md:p-10 text-center">
                    <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden border-4 border-[#FFC857]">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <Quote 
                        size={40} 
                        className="mx-auto text-[#FFC857] opacity-50" 
                      />
                    </div>
                    <p className="text-xl italic mb-6">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-20"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-[#FFC857]' : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;