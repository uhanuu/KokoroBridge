import "./globals.css";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/main-header";
import Navigation from "@/components/navigation/navigation";

import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <Header />
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
