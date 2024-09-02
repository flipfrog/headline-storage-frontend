import HeadlineList from "@/app/_components/HeadlineList";
import { getCategories, getHeadlines } from "@/app/_components/fetchers";

export type Headline = {
  id: number;
  category: string;
  title: string;
  description: string | null;
  forward_refs?: Headline[];
  backward_refs?: Headline[];
};

export default async function Home() {
  const categories: string[] = await getCategories();
  const headlines: Headline[] = await getHeadlines();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeadlineList categories={categories} headlines={headlines} />
    </main>
  );
}
