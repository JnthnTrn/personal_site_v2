import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans, Noto_Sans_Runic } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", weight: ["300", "400", "500"], subsets: ["latin"] });
const sans = IBM_Plex_Sans({ variable: "--font-sans", weight: ["400", "500"], subsets: ["latin"] });
const runic = Noto_Sans_Runic({ variable: "--font-runic", weight: "400", subsets: ["runic"] });

export const metadata: Metadata = {
  title: site.name,
  description: `${site.name}. ${site.role}.`,
};

export const viewport: Viewport = { themeColor: "#06090c" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${runic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
