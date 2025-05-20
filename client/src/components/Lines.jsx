import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Background colors by decade
const getBgClass = (date) => {
  const year = parseInt(date?.match(/\d{4}/)?.[0] || "0");
  if (year >= 2020) return "bg-purple-50";
  if (year >= 2010) return "bg-purple-100";
  if (year >= 2000) return "bg-purple-200";
  if (year >= 1990) return "bg-purple-300";
  return "bg-purple-400";
};

export default function Lines() {
  const [lines, setLines] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("/api/lines")
      .then((res) => res.json())
      .then((data) => {
        const cleaned = data.map((line) => ({
          ...line,
          image: line.image?.replace(/,$/, ""),
          title: line.title?.replace(/,$/, ""),
          members: Array.isArray(line.members)
            ? line.members.map((m) => m.replace(/,$/, ""))
            : [],
        }));

        const sorted = cleaned.sort((a, b) => {
          return (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
        });

        setLines(sorted);
      })
      .catch((err) => console.error("Failed to load lines", err));
  }, []);

  const toggle = (i) => {
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const expandAll = () => {
    const all = {};
    lines.forEach((_, i) => (all[i] = true));
    setExpanded(all);
  };

  const collapseAll = () => {
    const all = {};
    lines.forEach((_, i) => (all[i] = false));
    setExpanded(all);
  };

  return (
    <section id="lines" className="py-20 px-4 bg-white text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-purple-700 mb-2">
            Lines Timeline
          </h2>
          <p className="text-base sm:text-lg text-gray-700">
            Explore the history of our lineages through the years.
          </p>
        </motion.div>

        <div className="text-end mb-6 space-x-2">
          <button
            onClick={expandAll}
            className="px-3 py-1 text-sm border border-purple-700 text-purple-700 rounded hover:bg-purple-700 hover:text-white"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
          >
            Collapse All
          </button>
        </div>

        <div className="space-y-8">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`rounded-xl shadow border border-purple-200 p-5 sm:p-6 transition-all hover:shadow-md ${getBgClass(
                line.date
              )}`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left text-xl sm:text-2xl font-bold text-purple-900 hover:underline"
              >
                {line.title} {line.date ? `– ${line.date}` : ""}
              </button>

              {expanded[i] && (
                <div className="mt-4 text-black text-sm sm:text-base space-y-4">
                  {line.image && (
                    <div className="w-full flex justify-center">
                      <img
                        src={
                          line.image.startsWith("http")
                            ? line.image
                            : `/images/${line.image}`
                        }
                        alt={line.title}
                        className="w-full max-w-2xl max-h-64 object-contain rounded-lg shadow"
                      />
                    </div>
                  )}

                  <ul className="list-disc list-inside space-y-1 font-medium px-2">
                    {line.members.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>

                  <div className="italic space-y-1 text-sm sm:text-base px-2">
                    {line.me && (
                      <p>
                        <span className="font-semibold">ME:</span> {line.me}
                      </p>
                    )}
                    {line.ame && (
                      <p>
                        <span className="font-semibold">AME:</span> {line.ame}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
