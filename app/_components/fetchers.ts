import { Headline } from "@/app/page";

const baseUrl = 'http://localhost/api/';

export const getHeadlines = async (categories?: string[]) : Promise<Headline[]> => {
    type Received = {
        headlines: Headline[];
    };
    // todo: manage base url.
    const url = baseUrl+'headlines' + (categories ? '?categories='+categories.join(',') : '');
    const data = await fetch(url, { cache: 'no-store' });
    const json : Received = await data.json();
    return json.headlines;
};

export const getCategories = async () : Promise<string[]> => {
    type Received = {
        categories: string[];
    };
    // todo: manage base url.
    const data = await fetch(baseUrl+'categories', { cache: 'no-store' });
    const json : Received = await data.json();
    return json.categories;
};

