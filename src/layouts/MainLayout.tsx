// src/layout/MainLayout.tsx
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
