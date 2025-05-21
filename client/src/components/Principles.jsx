import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Principles() {
  const [principles, setPrinciples] = useState([]);

  useEffect(() => {
    fetch("/api/principles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPrinciples(data);
        } else if (Array.isArray(data.principles)) {
          setPrinciples(data.principles);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch principles", err);
      });
  }, []);

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="principles" className="py-16 bg-transparent text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-4xl sm:text-5xl font-serif font-bold text-center text-purple-700 mb-12"
        >
          Our Four Principles
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, index) => (
            <motion.div
              key={p._id || index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform hover:scale-105"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 space-y-2 text-left">
                <h5 className="text-lg sm:text-xl font-semibold text-purple-700 font-serif">
                  {p.title}
                </h5>
                <p className="text-gray-700 text-sm sm:text-base font-sans leading-relaxed">
                  {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {principles.length === 0 && (
          <p className="mt-8 text-center text-gray-500 text-sm">
            No principles found. Check your admin panel or database.
          </p>
        )}
      </div>
    </section>
  );
}
