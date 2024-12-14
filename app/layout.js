import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nollywood Auditions - Join the Actors Guild of Nigeria",
  description: "Showcase your talent and become Nollywood's next star! Join the 2025/2026 auditions and train with industry experts.",
  openGraph: {
    title: "Nollywood Auditions - Join the Actors Guild of Nigeria",
    description: "Showcase your talent and become Nollywood's next star! Join the 2025/2026 auditions and train with industry experts.",
    url: "https://nw-audition.vercel.app/", // Replace with your actual URL
    siteName: "Nollywood Auditions",
    images: [
      {
        url: "https://nw-audition.vercel.app/assets/nw-au.jpg", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Nollywood Auditions",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
