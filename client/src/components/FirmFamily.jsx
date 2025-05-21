import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FirmFamily() {
  const [firms, setFirms] = useState([]);

  useEffect(() => {
    fetch("/api/firm")
      .then((res) => res.json())
      .then((data) => {
        if (data.firms && Array.isArray(data.firms)) {
          setFirms(data.firms);
        } else {
          setFirms([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load Firm Family", err);
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
    <section id="firm-family" className="py-20 bg-transparent text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-purple-700 mb-4">
            FIRM Family
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            The FIRM Family was founded to unite culturally based Greek organizations through brotherhood,
            mutual respect, and collaboration. As the first interracially mixed family of its kind,
            FIRM symbolizes the strength of diversity, the power of unity, and the commitment to uplifting one another
            across cultural lines.
          </p>
        </motion.div>

        {firms.length === 0 && (
          <p className="text-center text-gray-500">No fraternities or sororities listed yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {firms.map((f, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUp}
              className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="relative w-full h-44 overflow-hidden">
                {f.image && (
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="px-5 py-4 space-y-2 text-left">
                <h3 className="text-lg font-serif font-semibold text-purple-700">
                  {f.name}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-sans">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
