import dynamic from 'next/dynamic';
const Synthesizer = dynamic(() => import('@/components/synthesizer'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-w-[1200px] min-h-screen flex-col items-center justify-between py-12">
      <Synthesizer />
    </main>
  );
}
