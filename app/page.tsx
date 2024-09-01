import FirstComponent from "@/app/_components/FirstComponent";

export default async function Home() {

    const data = await fetch('http://localhost/api/headlines', { cache: 'no-store' });
    // TODO: Define Type Of Headline.
    const headlines = await data.json();
    console.log('*** headlines='+JSON.stringify(headlines));

    return <FirstComponent firstName="Albert" />;
}
