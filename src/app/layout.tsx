import Providers from "@/lib/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/ui/Footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Pristine Perfection",
  description: "Pristine Perfection at your Makeover Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen pb-32">
          <Providers>{children}</Providers>
        </div>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
