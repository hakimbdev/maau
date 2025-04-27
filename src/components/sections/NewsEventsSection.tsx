import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { news } from "../../data/news";
import { events } from "../../data/events";

const NewsEventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4">
            News & Events
          </h2>
          <div className="h-1 w-20 bg-[#8B0000] mx-auto mb-6"></div>
          <p className="text-gray-700 text-lg">
            Stay updated with the latest news and upcoming events at our university.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'news'
                  ? 'bg-[#0A2463] text-white'
                  : 'text-gray-700 hover:text-[#0A2463]'
              }`}
              onClick={() => setActiveTab('news')}
            >
              Latest News
            </button>
            <button
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-[#0A2463] text-white'
                  : 'text-gray-700 hover:text-[#0A2463]'
              }`}
              onClick={() => setActiveTab('events')}
            >
              Upcoming Events
            </button>
          </div>
        </div>

        {/* News Content */}
        <div className={`${activeTab === 'news' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 bg-[#8B0000] text-white px-3 py-1 text-sm">
                    {item.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#0A2463] mb-3 line-clamp-2 group-hover:text-[#8B0000] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <a
                    href={`/news/${item.id}`}
                    className="inline-block text-[#8B0000] font-medium hover:text-[#700000] transition-colors"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="/news"
              className="inline-block border-2 border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463] hover:text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              View All News
            </a>
          </div>
        </div>

        {/* Events Content */}
        <div className={`${activeTab === 'events' ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow"
              >
                <div className="md:w-1/3 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-semibold text-[#0A2463] mb-2 group-hover:text-[#8B0000] transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <Calendar size={16} className="mr-1" />
                    <span>{event.date}</span>
                    <Clock size={16} className="ml-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <a
                    href={`/events/${event.id}`}
                    className="inline-block bg-[#FFC857] hover:bg-[#FFD77A] text-[#0A2463] px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="/events"
              className="inline-block border-2 border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463] hover:text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              View All Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;