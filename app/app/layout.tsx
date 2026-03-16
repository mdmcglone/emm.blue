import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true, // Preload font for faster rendering
});

export const metadata: Metadata = {
  title: "Em McGlone - Software Engineer & Former CTO | emm.blue",
  description: "Em McGlone - Software engineer and former CTO of jhana.ai (legal tech startup). Background in AI/ML, physics, computer science, and full-stack development. Experience building AI-powered legal technology. Seeking AI/ML engineering opportunities in Europe.",
  keywords: [
    "Em McGlone",
    "AI engineer",
    "machine learning engineer",
    "ML engineer",
    "AI software engineer",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "NLP engineer",
    "LLM engineer",
    "AI/ML engineer",
    "software engineer",
    "CTO",
    "full stack developer",
    "React",
    "TypeScript",
    "Next.js",
    "Python",
    "Django",
    "jhana",
    "jhana.ai",
    "legal tech",
    "legal AI",
    "AI startup",
    "startup",
    "software engineering jobs",
    "AI jobs Europe",
    "ML jobs Europe",
    "Europe software engineer",
    "technical lead",
    "engineering manager",
    "portfolio",
    "web developer",
    "frontend developer",
    "backend developer",
    "data science",
    "neural networks",
    "computer vision",
    "natural language processing",
  ],
  authors: [{ name: "Em McGlone", url: "https://emm.blue" }],
  creator: "Em McGlone",
  publisher: "Em McGlone",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emm.blue",
    siteName: "emm.blue",
    title: "Em McGlone - Software Engineer & Former CTO",
    description: "Software engineer and former CTO of jhana.ai. Background in AI/ML, physics, computer science, and full-stack development. Experience building AI-powered legal technology. Seeking AI/ML engineering opportunities in Europe.",
    images: [
      {
        url: "/darkmatter-md.webp",
        width: 1200,
        height: 630,
        alt: "Em McGlone Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Em McGlone - Software Engineer & Former CTO",
    description: "Software engineer and former CTO of jhana.ai. Experience building AI-powered legal technology. Seeking AI/ML engineering opportunities in Europe.",
    images: ["/darkmatter-md.webp"],
  },
  alternates: {
    canonical: "https://emm.blue",
  },
  other: {
    "contact:email": "emdmcglone@gmail.com",
    "profile:first_name": "Em",
    "profile:last_name": "McGlone",
    "profile:username": "emdmcglone",
  },
  icons: {
    icon: "/mFavicon-small.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains to reduce connection time */}
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.iconify.design" />
        
        {/* Preload LCP image (background) - tiny, medium, and large versions for progressive enhancement */}
        <link
          rel="preload"
          href="/darkmatter-tiny.webp"
          as="image"
          fetchPriority="high"
        />
        
        {/* Preload LCP content images (binocularts and chair) - all sizes for progressive enhancement */}
        <link
          rel="preload"
          href="/photos/binocularts-tiny.webp"
          as="image"
          fetchPriority="high"
        />

        <link
          rel="preload"
          href="/photos/chair-tiny.webp"
          as="image"
          fetchPriority="high"
        />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Em McGlone",
              url: "https://emm.blue",
              email: "emdmcglone@gmail.com",
              jobTitle: "Software Engineer",
              alumniOf: {
                "@type": "Organization",
                name: "jhana.ai",
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Deep Learning",
                "Natural Language Processing",
                "Large Language Models",
                "LLM",
                "AI/ML Engineering",
                "Legal AI",
                "Legal Technology",
                "Software Engineering",
                "Full Stack Development",
                "React",
                "TypeScript",
                "Next.js",
                "Python",
                "Django",
                "Data Science",
                "Neural Networks",
                "Computer Science",
                "Physics",
                "Startup Leadership",
              ],
              sameAs: [
                "https://www.linkedin.com/in/em-mcglone/",
                "https://github.com/mdmcglone",
              ],
              image: [
                "https://emm.blue/darkmatter-md.webp",
                "https://emm.blue/photos/chair-md.webp",
                "https://emm.blue/photos/binocularts-md.webp",
              ],
              description:
                "Software engineer and former CTO of jhana.ai. Background in AI/ML, physics, computer science, and full-stack development. Experience building AI-powered legal technology. Seeking AI/ML engineering opportunities in Europe.",
            }),
          }}
        />
      </head>
      <body className={geistMono.variable}>{children}</body>
    </html>
  );
}
