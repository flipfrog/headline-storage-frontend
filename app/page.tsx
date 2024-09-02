import HeadlineList from "@/app/_components/HeadlineList";

export type Headline = {
  id: number;
  title: string;
  description: string | null;
  forward_refs?: Headline[];
  backward_refs?: Headline[];
};

export default async function Home() {
  type Received = {
    headlines: Headline[];
  };
  const data = await fetch('http://localhost/api/headlines', { cache: 'no-store' });
  const received : Received = await data.json();
  const headlines: Headline[] = received.headlines;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeadlineList headlines={headlines} />
    </main>
  );
}
