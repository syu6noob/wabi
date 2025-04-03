import Clock from "@/components/Clock";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div
      className="relative flex w-full h-dvh bg-[var(--backgroundColor)]"
    >
      <div className="flex grow h-full p-6 lg:p-8 flex-col">
        <Header />
        <Clock />
        <Footer />
      </div>
    </div>
  );
}
