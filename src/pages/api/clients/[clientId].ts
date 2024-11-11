export const prerender = false;

import type { APIRoute } from "astro";

// obtener la persona por el id
export const GET: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId

    const body = {
        Method: "GET",
        "client_id": clientId
    }

    return new Response(JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json"
            }
        }
    );
};


export const PATCH: APIRoute = async ({ params, request}) => {
    const clientId = params.clientId

    const body = {
        Method: "PATCH",
        "client_id": clientId
    }

    return new Response(JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json"
            }
        }
    )
}

export const DELETE: APIRoute = async ({ params, request}) => {

    const clientId = params.clientId

    const body = {
        Method: "DELETE",
        "client_id": clientId
        }
        return new Response(JSON.stringify(body), {
            headers: {
                "Content-Type": "application/json"
            }

        })
}
