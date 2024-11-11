import type { APIRoute } from "astro";
import { db, Clients } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request}) => {

    const body = {
        "method": "GET",
    }

    const users = await db.select().from(Clients).all();

    return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const POST: APIRoute = async ({ params, request}) => {

    try {
        const { id, ...body } = await request.json();

        const resp = await db.insert(Clients).values(body)
        console.log(resp)

        const { lastInsertRowid} = await db.insert(Clients).values(body);

        return new Response(JSON.stringify({
            id: +lastInsertRowid!.toString(),
            ...body,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ msg: "Error" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}


