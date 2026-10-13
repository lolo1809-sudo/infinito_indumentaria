import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function LayoutPublico() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
