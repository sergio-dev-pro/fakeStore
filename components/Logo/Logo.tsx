import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import "./logo.scss";

export const Logo = () => {
  return (
    <div className="logo">
      <Image
        fill
        src={logo}
        alt="Logotipo da loja"
      />
    </div>
  );
};
