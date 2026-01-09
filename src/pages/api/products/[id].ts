import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
    const url = `${import.meta.env.API_URL}/freshcoffee_products/${params.id}`;

    const response = await fetch(url);
    const json = await response.json();

    return new Response(JSON.stringify(json));
};
