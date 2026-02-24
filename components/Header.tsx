
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-primary/10 pt-8 pb-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-normal text-secondary mb-3 tracking-tight leading-tight">
          Make It Matter – Charity Craft Project Finder
        </h1>
        <p className="text-gray-text max-w-3xl mx-auto text-base md:text-lg leading-relaxed font-medium">
          Got leftover yarn or fabrics scraps? Looking for a way to support your local community or a cause close to your heart? Welcome to your local Aussie charity craft project finding companion!
        </p>
      </div>
    </header>
  );
};

export default Header;
