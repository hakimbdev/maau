import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A2463] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Maryam Sani Abacha University</h3>
            <p className="mb-4 text-gray-300">
              Dedicated to excellence in education, research, and innovation
              since 1980.
            </p>
            <div className="flex space-x-3 mt-6">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-[#FFC857] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/academics" className="hover:text-[#FFC857] transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="/admissions" className="hover:text-[#FFC857] transition-colors">
                  Admissions
                </a>
              </li>
              <li>
                <a href="/campus-life" className="hover:text-[#FFC857] transition-colors">
                  Campus Life
                </a>
              </li>
              <li>
                <a href="/research" className="hover:text-[#FFC857] transition-colors">
                  Research
                </a>
              </li>
              <li>
                <a href="/news-events" className="hover:text-[#FFC857] transition-colors">
                  News & Events
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-[#FFC857] transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/library" className="hover:text-[#FFC857] transition-colors">
                  Library
                </a>
              </li>
              <li>
                <a href="/calendar" className="hover:text-[#FFC857] transition-colors">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="/portal" className="hover:text-[#FFC857] transition-colors">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="/helpdesk" className="hover:text-[#FFC857] transition-colors">
                  IT Helpdesk
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-[#FFC857] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-[#FFC857] transition-colors">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 shrink-0" size={18} />
                <span>123 University Avenue, Main Campus, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 shrink-0" size={18} />
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 shrink-0" size={18} />
                <span>info@msau.edu.ng</span>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="/contact"
                className="bg-[#FFC857] hover:bg-[#FFD77A] text-[#0A2463] px-4 py-2 rounded-md font-medium inline-block transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Maryam Sani Abacha University. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-300">
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="/sitemap" className="hover:text-white">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;