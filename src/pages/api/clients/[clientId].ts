import { db, Clients, eq } from 'astro:db';
import type { APIRoute } from "astro";

export const prerender = false;

// obtener la persona por el id
export const GET: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId ?? '';

    try {
        const clients = await db
            .select()
            .from(Clients)
            .where(eq(Clients.id, +clientId))

            if (clients.length === 0) {
                return new Response(
                    JSON.stringify({ MSG: 'No se encontró el cliente' }), 
                    { 
                        status: 404,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }

        return new Response(JSON.stringify(clients.at(0)), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ msg: "Error fetching client" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

export const PATCH: APIRoute = async ({ params, request}) => {
    const clientId = params.clientId ?? '';

    try {
        const { id, ...body } = await request.json();
        console.log(body)

        const results = await db
            .update(Clients)
            .set(body)
            .where( eq(Clients.id, +clientId));

        const updateClient = await db
            .select()
            .from(Clients)
            .where( eq(Clients.id, +clientId));

        return new Response(JSON.stringify(updateClient.at(0)), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ msg: "No body found" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export const DELETE: APIRoute = async ({ params, request }) => {
    const clientId = params.clientId ?? '';

    try {

        const { rowsAffected } = await db
        .delete(Clients)
        .where(eq(Clients.id, +clientId));
    
        if (rowsAffected > 0) {
            return new Response(JSON.stringify({ msg: 'Deleted' }), {
                status: 200,
                headers: {
                'Content-Type': 'application/json',
                },
            });
        }
        return new Response(JSON.stringify({ msg: 'Not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ msg: "No body found" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
            });
        }
}
