import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Landmark,
  Star,
  Globe,
  Target,
  Crown,
} from "lucide-react";

const sectionIcons = {
  "National History": <Globe className="text-purple-600 w-6 h-6 mr-2" />,
  "Fraternity Facts": <BookOpen className="text-purple-600 w-6 h-6 mr-2" />,
  "Chapter History": <Landmark className="text-purple-600 w-6 h-6 mr-2" />,
  "Chapter Identity": <Star className="text-purple-600 w-6 h-6 mr-2" />,
  "Our Mission": <Target className="text-purple-600 w-6 h-6 mr-2" />,
  "Founding Fathers": <Crown className="text-purple-600 w-6 h-6 mr-2" />,
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        setAbout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load About content", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-lg font-sans">Loading...</p>;
  if (!about) return <p className="p-6 text-red-600 text-lg font-sans">No About data found.</p>;

  const sectionWithImage = (title, items, image) => (
    <motion.div
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-purple-50 border border-purple-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-4"
    >
      <div className="flex items-center text-2xl sm:text-3xl font-serif font-semibold text-purple-800 tracking-tight mb-2">
        {sectionIcons[title]}
        {title}
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {image && (
          <div className="md:w-[200px] w-full flex-shrink-0 flex justify-center md:justify-start">
            <img
              src={image}
              alt={title + " Image"}
              className="rounded-xl shadow-lg w-full max-w-[200px] object-contain"
            />
          </div>
        )}
        <ul className="space-y-3 text-[17px] leading-relaxed text-gray-800 font-sans flex-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  return (
    <section id="about" className="bg-white text-gray-900 py-16 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        <motion.h2
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-serif text-4xl sm:text-5xl font-bold text-center text-purple-700 mb-10"
        >
          About Us
        </motion.h2>

        {about.nationalHistory?.length > 0 &&
          sectionWithImage("National History", about.nationalHistory, about.nationalHistoryImage)}

        {about.fraternityFacts?.length > 0 &&
          sectionWithImage("Fraternity Facts", about.fraternityFacts, about.fraternityFactsImage)}

        {about.history?.length > 0 &&
          sectionWithImage("Chapter History", about.history, about.historyImage)}

        {about.identity?.length > 0 &&
          sectionWithImage("Chapter Identity", about.identity, about.identityImage)}

        {about.foundingFathers?.length > 0 && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-purple-50 rounded-xl shadow-lg px-4 py-8 space-y-6"
          >
            <div className="flex items-center justify-center text-2xl sm:text-3xl font-serif font-semibold text-purple-800 mb-4">
              {sectionIcons["Founding Fathers"]}
              Founding Fathers
            </div>
            {about.foundingFathersImage && (
              <div className="flex justify-center">
                <img
                  src={about.foundingFathersImage}
                  alt="Founding Fathers"
                  className="rounded-lg shadow-xl max-w-2xl w-full object-cover"
                />
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-2 max-w-5xl mx-auto">
              {about.foundingFathers.map((name) => (
                <div
                  key={name}
                  className="bg-white text-sm sm:text-base font-medium border border-purple-100 rounded-xl px-3 py-2 shadow transition-transform duration-200 hover:scale-105 hover:bg-purple-100 text-center"
                >
                  {name}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Our Mission section (image larger + centered) */}
        {about.mission?.length > 0 && (
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-purple-50 border border-purple-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center text-2xl sm:text-3xl font-serif font-semibold text-purple-800 tracking-tight mb-2">
              {sectionIcons["Our Mission"]}
              Our Mission
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <ul className="space-y-3 text-[17px] leading-relaxed text-gray-800 font-sans flex-1">
                {about.mission.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {about.missionImage && (
                <div className="md:w-[300px] w-full flex-shrink-0 flex justify-center md:justify-center">
                  <img
                    src={about.missionImage}
                    alt="Our Mission Image"
                    className="rounded-xl shadow-lg w-full max-w-[300px] object-contain"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
