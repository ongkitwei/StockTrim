import React from "react";

function Header() {
  return (
    <div className="w-full h-[70px] flex items-center justify-center bg-white mb-6 font-bungee text-2xl">
      <span>Stock</span>
      <span className="text-info">Trim</span>
    </div>
  );
}

export default Header;
