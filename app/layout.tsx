import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth";
import { Navbar } from "@/components/navbar/navbar";
import { QueryProvider } from "@/contexts/query";
import { ToastProvider } from "@/components/toast";
import { Toaster } from "@/components/toaster";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holiwise",
  description: "AI travel agency",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${jakartaSans.variable} antialiased`}>
        <AuthProvider>
          <QueryProvider>
            <div className="flex flex-col min-h-full">
              <Navbar />
              <main className="flex-1 overflow-x-hidden  pt-6">{children}</main>
            </div>
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
