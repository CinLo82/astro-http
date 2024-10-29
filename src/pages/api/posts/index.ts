import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request}) => {

    const posts = await getCollection('blog')

    const url = new URL(request.url)
    const slug = url.searchParams.get('slug')

    if (slug) {
        const post = posts.find(post => post.slug === slug)
        if (post) {
            return new Response(JSON.stringify(post), { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return new Response(JSON.stringify({ message: 'Post not found' }), { 
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    console.log(request)
    return new Response(JSON.stringify(posts), { 
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

