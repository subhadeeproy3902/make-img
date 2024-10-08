"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <header className="w-full max-w-7xl absolute top-4 z-50 text-white">
        <nav className="container mx-auto px-4">
          <div className="backdrop-blur-md bg-white/10 rounded-lg md:rounded-full shadow-lg">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
              <Link href="/" className="text-2xl font-bold">
                AI Image
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/features"
                  className="hover:text-green-400 transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="hover:text-green-400 transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="hover:text-green-400 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>
              </div>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            {isMenuOpen && (
              <div className="md:hidden px-4 py-2 space-y-2">
                <Link
                  href="/features"
                  className="block py-2 hover:text-green-400 transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="block py-2 hover:text-green-400 transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="block py-2 hover:text-green-400 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
