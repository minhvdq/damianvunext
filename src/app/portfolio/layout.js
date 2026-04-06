import { Inter } from "next/font/google";
import "@/styles/portfolio-timeline.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Damian Vu | Portfolio",
  description:
    "Project timeline: Rice Leaf Disease Classification, CS Event Hub, Rate My Classes, and more.",
};

export default function PortfolioLayout({ children }) {
  return (
    <div className={`portfolio-root ${inter.className} min-h-full`}>
      {children}
    </div>
  );
}
