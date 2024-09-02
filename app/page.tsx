import HeadlineList from "@/app/_components/HeadlineList";

export type Headline = {
  id: number;
  category: string;
  title: string;
  description: string | null;
  forward_refs?: Headline[];
  backward_refs?: Headline[];
};

const getCategories = async () : Promise<string[]> => {
  type Received = {
    categories: string[];
  };
  const data = await fetch('http://localhost/api/categories', { cache: 'no-store' });
  const json : Received = await data.json();
  return json.categories;
};

const getHeadlines = async () : Promise<Headline[]> => {
  type Received = {
    headlines: Headline[];
  };
  const data = await fetch('http://localhost/api/headlines', { cache: 'no-store' });
  const json : Received = await data.json();
  return json.headlines;
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
