import React from "react";
import { ChevronRight, Mail, Phone, MapPin } from "lucide-react";

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-20 relative bg-gradient-to-r from-[#0A2463] to-[#1E3A8A]">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Connect With Maryam Abacha American University
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Have questions about our programs, campus life, or admission process?
                  Our team is here to help you navigate your educational journey.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <Phone className="text-[#FFC857] mr-3 h-5 w-5" />
                    <span>+234 123 456 7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-[#FFC857] mr-3 h-5 w-5" />
                    <span>admissions@maau.edu.ng</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-[#FFC857] mr-3 h-5 w-5 mt-1" />
                    <span>123 University Avenue, Abuja, Nigeria</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="bg-white text-[#0A2463] hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors inline-flex items-center"
                  >
                    Contact Us
                    <ChevronRight size={18} className="ml-2" />
                  </a>
                  <a
                    href="/admissions/visit"
                    className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-md font-semibold transition-colors"
                  >
                    Schedule a Visit
                  </a>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Request Information</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC857] text-white placeholder-white/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC857] text-white placeholder-white/50"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Program of Interest</label>
                    <select className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC857] text-white">
                      <option value="" className="bg-[#0A2463]">Select a program</option>
                      <option value="computer-science" className="bg-[#0A2463]">Computer Science</option>
                      <option value="business-admin" className="bg-[#0A2463]">Business Administration</option>
                      <option value="engineering" className="bg-[#0A2463]">Engineering</option>
                      <option value="medicine" className="bg-[#0A2463]">Medicine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white text-sm mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC857] text-white placeholder-white/50 h-24"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FFC857] hover:bg-[#e6b64e] text-[#0A2463] font-bold py-3 px-4 rounded-md transition-colors"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
    </section>
  );
};

export default CallToActionSection;