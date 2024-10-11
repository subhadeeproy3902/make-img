import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Image Gen",
  description: "Create stunning images with AI",
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://i.postimg.cc/y88DYVKn/940-1x-shots-so-1.webp',
        width: 1000,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={"bg-black" + inter.className}>
        <Toaster richColors />{children}<Footer /></body>
    </html>
  );
}
