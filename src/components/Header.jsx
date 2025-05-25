import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        document.body.classList.add('header-shrink');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-[var(--color-1)] text-white shadow-sm shadow-[var(--color-1)] transition-all duration-300">
      {/* Top Info Bar */}
      <div
        id="top-info"
        className="w-full bg-[var(--color-6)] text-xs text-center py-1 tracking-wide uppercase transition-all duration-300"
      >
        Located in Calgary | We ship Canada wide
      </div>

      {/* Main Header */}
      <div
        id="header-inner"
        className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2 transition-all duration-300"
      >
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/assets/logo_blanco.png"
            alt="Logo"
            id="logo-img"
            className="h-10 transition-all duration-300"
          />
          <p id="logo-text" className="text-lg transition-all duration-300"></p>
        </a>

        {/* Nav */}
        <nav className="flex items-center space-x-6 text-sm md:text-base font-medium relative">
          <a href="/products" className="hover:text-[var(--color-3)] transition">
            Shop
          </a>
          <a href="/flavours" className="hover:text-[var(--color-3)] transition">
            Flavour Menu
          </a>

          {/* Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="hover:text-[var(--color-3)] transition"
            >
              About Us ▾
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-40 bg-[var(--color-5)] text-white rounded shadow-lg z-10 transition-all duration-200 ${
                isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <a
                href="/gallery"
                className="block px-4 py-2 hover:bg-[var(--color-4)]"
              >
                Gallery
              </a>
              <a
                href="/#story"
                className="block px-4 py-2 hover:bg-[var(--color-4)]"
              >
                Our Story
              </a>
            </div>
          </div>

          {/* Cart */}
          <div className="border-l h-5 border-white/30 mx-2"></div>
          <a href="/cart" className="relative hover:text-[var(--color-3)]">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6M6 19a1 1 0 102 0 1 1 0 00-2 0zm12 0a1 1 0 102 0 1 1 0 00-2 0z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
