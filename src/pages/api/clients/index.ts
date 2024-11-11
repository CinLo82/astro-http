import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, request}) => {

    return new Response(JSON.stringify(
        {
            method: "GET",

        }), {
    
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const POST: APIRoute = async ({ params, request}) => {

    const body = await request.json()

    return new Response(JSON.stringify(
        {
            method: "POST",
            ...body
        }), {
    
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

