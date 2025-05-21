import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Eboard() {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    fetch("/api/eboards")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setOfficers(sorted);
      });
  }, []);

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <section id="eboard" className="py-20 bg-transparent text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-purple-700 mb-2">
            Executive Board
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Meet our current chapter officers for 2024–2025.
          </p>
        </motion.div>

        {officers.length === 0 && (
          <p className="text-center text-gray-500">No officers available.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {officers.map((officer, i) => (
            <motion.div
              key={officer._id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow border border-purple-200 hover:shadow-md transition-transform hover:scale-[1.02] duration-200 text-center px-6 py-8 max-w-sm mx-auto"
            >
              {officer.image && (
                <img
                  src={officer.image}
                  alt={officer.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto rounded-full object-cover shadow-lg mb-4"
                  loading="lazy"
                />
              )}
              <h3 className="text-xl sm:text-2xl font-semibold text-purple-800 font-serif">
                {officer.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-2">
                {officer.position}
              </p>
              {officer.bio && (
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                  {officer.bio}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
