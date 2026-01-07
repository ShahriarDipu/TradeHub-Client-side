import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  TrendingUp,
  Shield,
  Award,
  Target,
  Heart,
  Zap
} from "lucide-react";
import Footer from "../Pages/Footer/Footer";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize the safety and security of every transaction on our platform.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting traders from over 50 countries across the world.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your success is our priority. We're here to support you every step of the way.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly evolving with cutting-edge technology to serve you better.",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const stats = [
    { label: "Countries Served", value: "50+", icon: Globe },
    { label: "Active Traders", value: "10,000+", icon: Users },
    { label: "Products Listed", value: "50,000+", icon: Award },
    { label: "Success Rate", value: "99%", icon: TrendingUp }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      bio: "15+ years in international trade and e-commerce"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Former tech lead at major trading platforms"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Expert in supply chain and logistics management"
    },
    {
      name: "David Kim",
      role: "Head of Customer Success",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      bio: "Passionate about delivering exceptional service"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-orange-700 to-red-600 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About TradeHub</h1>
          <p className="text-xl text-orange-100">
            Empowering global trade since 2018, connecting buyers and sellers worldwide.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
            
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.15 }}
              className="text-center"
            >
              <stat.icon className="w-12 h-12 mx-auto text-orange-500 mb-4" />
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission + Values */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Target className="w-16 h-16 mx-auto text-orange-500 mb-6" />
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              To democratize international trade by providing a secure, transparent, and efficient marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-16/17 mx-auto">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4`}>
                  <v.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white dark:bg-gray-900 w-16/17 mx-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2018, TradeHub started with a vision to simplify global trade.
            </p>
            <p className="text-gray-600">
              Today, we serve thousands of traders across the globe with trust and innovation.
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
            alt="Our story"
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600">The people behind TradeHub</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
            
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <img src={m.image} alt={m.name} className="w-full h-60 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold">{m.name}</h3>
                  <p className="text-orange-600 font-medium mb-2">{m.role}</p>
                  <p className="text-sm text-gray-600">{m.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-4"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Join TradeHub?</h2>
          <p className="text-orange-100 mb-8">
            Start trading with confidence today.
          </p>
          <button
            onClick={() => (window.location.href = "/LoginRegister")}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition"
          >
            Get Started
          </button>
        </motion.div>
      </section>
    
    </div>
  );
}
