import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      desc: "Sign up in seconds and get instant access to our global marketplace",
      points: ["Quick registration", "Verified profiles", "Secure platform"],
    },
    {
      number: "02",
      title: "List or Browse Products",
      desc: "Export your products or import from thousands of verified suppliers",
      points: ["Easy product listing", "Advanced search", "Quality assurance"],
    },
    {
      number: "03",
      title: "Start Trading",
      desc: "Connect, negotiate, and complete transactions with confidence",
      points: ["Secure payments", "Order tracking", "24/7 support"],
    },
  ];

  return (
    <section className=" py-20 ">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-base-content mb-2">How It Works</h2>
        <p className="text-base-content mb-12">
          Start trading globally in three simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-8 shadow-2xl hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <h1 className="text-6xl font-extrabold text-orange-100 mb-4">
                {step.number}
              </h1>
              <h3 className="text-lg font-semibold text-base-content mb-2">
                {step.title}
              </h3>
              <p className="text-base-content text-sm mb-4">{step.desc}</p>

              <ul className="text-left space-y-2">
                {step.points.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-base-content">
                    <FaCheckCircle className="text-green-500" /> {p}
                  </li>
                ))}
              </ul>

           
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-[-20px] transform -translate-y-1/2 text-orange-300 text-2xl">
                  ➜
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
