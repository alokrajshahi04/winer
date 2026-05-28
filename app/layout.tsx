import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Winer \u2014 Your AI Co-founder",
  description:
    "A voice-first AI co-founder that knows your projects, supervises your work, and feels like a real human partner. Powered by ElevenLabs Speech Engine.",
  openGraph: {
    title: "Winer \u2014 Your AI Co-founder",
    description: "Never build alone again. Your AI co-founder that actually talks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
