"use client";

import Image from "next/image";
import { siteConfig, socialLinks } from "@/data/siteData";
import { SocialIcon } from "@/components/SocialIcons";
import { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      {/* HMath-inspired animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2991DB] via-[#2480c4] to-[#1b6da8]" />
        {/* Floating orbs */}
        <div className="absolute top-[10%] left-[15%] w-72 h-72 bg-sky-300/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-[15%] right-[10%] w-80 h-80 bg-blue-200/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[50%] left-[60%] w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content card */}
      <div className="w-full max-w-md mx-auto">
        {/* Profile section */}
        <div className="text-center mb-8 animate-fade-in">
          {/* Avatar with pulse ring */}
          <div className="relative w-32 h-32 mx-auto mb-5">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-sky-300 animate-pulse-ring" />
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-sky-300 p-1 shadow-2xl shadow-primary-950/30">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src={siteConfig.avatarUrl}
                  alt={siteConfig.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1.5 tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-blue-100 font-medium text-sm mb-3">
            {siteConfig.title}
          </p>
          <p className="text-blue-200/80 text-sm italic max-w-xs mx-auto leading-relaxed">
            👣 {siteConfig.bio}
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          {socialLinks.map((link, idx) => (
            <LinkButton key={link.label} link={link} index={idx} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "800ms" }}>
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function LinkButton({ link, index }: { link: typeof socialLinks[number]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-slide-up block"
      style={{ animationDelay: `${200 + index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative overflow-hidden rounded-2xl
          bg-white/15 backdrop-blur-md border border-white/20
          hover:bg-white/25 hover:border-white/40 hover:scale-[1.02]
          active:scale-[0.98]
          transition-all duration-300 ease-out
          shadow-sm hover:shadow-lg hover:shadow-black/10
          group cursor-pointer
        `}
      >
        {/* Shimmer effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-500 ${isHovered ? "opacity-100 animate-shimmer" : "opacity-0"
            }`}
        />

        <div className="relative flex items-center px-5 py-4">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            <SocialIcon name={link.icon} className="w-5 h-5" />
          </div>

          {/* Label */}
          <span className="flex-1 text-center text-white font-semibold text-[14px] tracking-wide pr-10">
            {link.label}
          </span>

          {/* Arrow */}
          <svg
            className="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
