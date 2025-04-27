import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Search, Phone, Mail } from "lucide-react";
import { navLinks } from "../../data/navLinks";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (title: string) => {
    if (activeDropdown === title) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(title);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-[#0A2463] text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone size={14} className="mr-1" />
              <span>+234 123 456 7890</span>
            </div>
            <div className="hidden md:flex items-center">
              <Mail size={14} className="mr-1" />
              <span>admissions@maau.edu.ng</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="/portal" className="hover:text-[#FFC857]">Student Portal</a>
            <a href="/staff" className="hover:text-[#FFC857]">Staff Portal</a>
            <a href="/alumni" className="hover:text-[#FFC857]">Alumni</a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md py-3"
            : "bg-white/80 backdrop-blur-md py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://res.cloudinary.com/dc5qncppu/image/upload/v1745750075/maau_f9m28q.png"
                    alt="Maryam Abacha American University Logo"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,0,0,0.2))' }}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-base md:text-xl font-bold text-[#0A2463] leading-tight tracking-wide">
                    MARYAM ABACHA
                  </span>
                  <span className="text-base md:text-xl font-bold text-[#0A2463] leading-tight tracking-wide">
                    AMERICAN UNIVERSITY
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.title} className="relative group">
                  <button
                    className={`px-3 py-2 flex items-center text-gray-800 hover:text-[#8B0000] font-medium ${
                      activeDropdown === link.title ? "text-[#8B0000]" : ""
                    }`}
                    onClick={() => link.children && toggleDropdown(link.title)}
                  >
                    {link.title}
                    {link.children && (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                  </button>

                  {link.children && (
                    <div
                      className={`absolute left-0 mt-0 w-60 bg-white shadow-lg rounded-b-md py-2 transform transition-all duration-300 ${
                        activeDropdown === link.title
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-4 pointer-events-none"
                      }`}
                    >
                      {link.children.map((child) => (
                        <a
                          key={child.title}
                          href={child.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#8B0000]"
                        >
                          {child.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search and Mobile Menu Buttons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search size={20} />
              </button>
              <button
                className="lg:hidden p-2 rounded-full hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 w-4/5 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <button
            className="absolute top-5 right-5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
          <div className="mt-10">
            {navLinks.map((link) => (
              <div key={link.title} className="py-2">
                {link.children ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 border-b border-gray-200"
                      onClick={() => toggleDropdown(link.title)}
                    >
                      <span className="font-medium">{link.title}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === link.title && (
                      <div className="pl-4 mt-2 space-y-2">
                        {link.children.map((child) => (
                          <a
                            key={child.title}
                            href={child.href}
                            className="block py-2 text-gray-600 hover:text-[#8B0000]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="block py-2 border-b border-gray-200 font-medium hover:text-[#8B0000]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </a>
                )}
              </div>
            ))}
            <div className="mt-6">
              <a
                href="/contact"
                className="block w-full bg-[#0A2463] hover:bg-[#051845] text-white px-4 py-3 rounded-md font-medium text-center transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;