import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 relative h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
