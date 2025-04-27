import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle,
  backgroundImage = "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
}) => {
  return (
    <div className="relative py-20 md:py-32 bg-[#0A2463] text-white mt-16">
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-200 max-w-4xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;