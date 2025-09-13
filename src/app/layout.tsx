import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

async function Footer() {
    return (
      <footer>
        <div>제작 @uhanuu</div>
      </footer>
    )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 KokoroBridge</Link>
          </header>
          <main>{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
