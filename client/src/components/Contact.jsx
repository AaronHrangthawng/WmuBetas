import React from "react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-purple-50 via-white to-purple-50 text-center py-20 px-4 font-sans"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-purple-700 mb-10 font-serif">
          Connect With Us
        </h2>

        {/* Logo with animation */}
        <div className="mb-4 flex justify-center">
          <img
            src="/uploads/betas-logo.png"
            alt="Betas Logo"
            className="w-32 h-32 object-contain drop-shadow-md animate-fade-in-zoom"
          />
        </div>

        {/* CTA under logo */}
        <p className="text-base sm:text-lg text-gray-700 mb-12">
          Follow us and stay connected with our latest events and moments.
        </p>

        {/* Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/wmubetas/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 flex flex-col items-center space-y-4"
          >
            <img
              src="/uploads/Instagram_icon.png"
              alt="Instagram"
              className="w-16 h-16 object-contain rounded-full transition-transform group-hover:scale-110"
            />
            <span className="text-gray-800 font-semibold text-lg transition-all duration-200 transform group-hover:-translate-y-1 group-hover:text-purple-700">
              Instagram
            </span>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@wmu.betas"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 flex flex-col items-center space-y-4"
          >
            <img
              src="/uploads/tiktok.avif"
              alt="TikTok"
              className="w-16 h-16 object-contain rounded-full transition-transform group-hover:scale-110"
            />
            <span className="text-gray-800 font-semibold text-lg transition-all duration-200 transform group-hover:-translate-y-1 group-hover:text-purple-700">
              TikTok
            </span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/wmu.betas"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 flex flex-col items-center space-y-4"
          >
            <img
              src="/uploads/Facebook.avif"
              alt="Facebook"
              className="w-16 h-16 object-contain rounded-full transition-transform group-hover:scale-110"
            />
            <span className="text-gray-800 font-semibold text-lg transition-all duration-200 transform group-hover:-translate-y-1 group-hover:text-purple-700">
              Facebook
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
