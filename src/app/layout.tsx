import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WriteWise AI",
  description: "Your AI-powered writing assistant for crafting clear, professional, and impactful content effortlessly.",
  keywords: ["AI writing assistant", "WriteWise", "content generation", "copywriting", "email writing", "productivity tool"],
  authors: [{ name: "WriteWise AI Team", url: "https://writewise-ai.vercel.app/" }],
  creator: "WriteWise AI",
  applicationName: "WriteWise AI",
  metadataBase: new URL("https://writewise-ai.vercel.app/"),
  openGraph: {
    title: "WriteWise AI – Smart Writing Made Simple",
    description: "WriteWise AI helps you generate polished content, emails, and more using the power of AI.",
    url: "https://writewise-ai.vercel.app/",
    siteName: "WriteWise AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WriteWise AI",
    description: "Polish your writing with AI – clear, professional, and fast.",
    creator: "@daniyalkhandev",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body className={``}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <main className="relative   overflow-hidden dark:bg-[#0000005d]">
              <Header />
              <div className="bg-circle w-56 h-56  md:w-96 md:h-96 bg-gradient-to-tr from-[#ff6161] via-[#ff7029] to-[#fbff00] top-[-100px] left-[-100px] animate-float-up"></div>

              <div className="bg-circle w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-green-400 to-lime-700 bottom-[-120px] right-[-100px] animate-float-left"></div>
              <div className="bg-circle w-40 h-40 md:w-72 md:h-72 bg-gradient-to-tl from-yellow-400 via-orange-400 to-pink-500 top-1/3 right-1/2 animate-float-up"></div>

              {children}
             <Footer/>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
