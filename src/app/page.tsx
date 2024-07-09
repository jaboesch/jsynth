import Synthesizer from "@/components/synthesizer";

export default function Home() {
  if (typeof window === "undefined") return null;
  return (
    <main className="flex min-w-[1200px] min-h-screen flex-col items-center justify-between py-12">
      <Synthesizer />
    </main>
  );
}
