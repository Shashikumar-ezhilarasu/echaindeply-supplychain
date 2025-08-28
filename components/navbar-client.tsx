"use client";

import React from "react";
import { Navbar, NavBody, NavbarLogo, NavbarWallet } from "@/components/ui/navbar";

export default function ClientNavbar() {
  return (
    <Navbar>
      <NavBody>
        <div className="flex items-center">
          <NavbarLogo />
        </div>

        <div className="flex items-center">
          <NavbarWallet />
        </div>
      </NavBody>
    </Navbar>
  );
}
