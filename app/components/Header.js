import React from "react";

function Header() {
  return (
    <div className="w-full bg-[#861F41] py-2" id="header">
      <img
        src="/logo.png"
        alt="logo"
        className="mx-auto"
        style={{ width: "80%", maxHeight: "16rem", objectFit: "contain" }}
      />
    </div>
  );
}

export default Header;
