import { Logo } from "@/components/Logo";
import "@/styles/globals.scss";
import "./layout.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Logo />
      <div className="form-wrapper">{children}</div>
    </main>
  );
}
