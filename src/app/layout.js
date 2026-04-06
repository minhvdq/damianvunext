import ChatWidgetDynamic from "@/components/ChatWidgetDynamic";
import "./globals.css";

export const metadata = {
  title: {
    default: "Damian Vu",
    template: "%s | Damian Vu",
  },
  description:
    "Portfolio of Minh (Damian) Vu — software developer and Gettysburg College student.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
        <ChatWidgetDynamic />
      </body>
    </html>
  );
}
