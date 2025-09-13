import "./globals.css";
import Link from "next/link";

import style from "./layout.module.css";

function Footer() {
  return (
    <footer>
      <div>제작 @uhanuu</div>
    </footer>
  );
}

function Header() {
  return (
    <header>
      <Link href={"/"}>KokoroBridge</Link>
    </header>
  );
}

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
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
