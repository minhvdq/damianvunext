import { Poppins } from "next/font/google";
import "@/styles/main-site.css";
import "@/styles/main-mediaqueries.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Damian Vu",
  description:
    "Portfolio of Minh (Damian) Vu — software developer and Gettysburg College CS & Math student.",
};

export default function MainSiteLayout({ children }) {
  return <div className={`${poppins.className} min-h-full`}>{children}</div>;
}
