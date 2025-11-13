import React from "react";
import { FaGlobe, FaShieldAlt, FaBolt, FaChartLine } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaGlobe className="text-3xl text-blue-500" />,
      title: "Global Reach",
      desc: "Connect with traders from over 50 countries worldwide",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-500" />,
      title: "Secure Trading",
      desc: "Protected transactions with built-in buyer and seller protection",
    },
    {
      icon: <FaBolt className="text-3xl text-orange-500" />,
      title: "Fast Processing",
      desc: "Quick approval and instant access to global marketplace",
    },
    {
      icon: <FaChartLine className="text-3xl text-purple-500 " />,
      title: "Growth Support",
      desc: "Tools and insights to help your business grow internationally",
    },
  ];

  return (
    <section className="py-16  ">
      <div className="w-15/17 mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-2">Why Choose TradeHub?</h2>
        <p className="text-base-content mb-10">
          Everything you need for successful global trade
        </p>

    
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {features.map((f, index) => (
            <div
              key={index}
              className="group  rounded-2xl p-6 py-15 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex justify-start mb-4">
                <div className="bg-gray-50 p-4  rounded-xl shadow-sm mr-4 transform transition-transform duration-300 group-hover:scale-125">
                  {f.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-start text-base-content">{f.title}</h3>
              <p className=" text-sm text-start text-base-content">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
