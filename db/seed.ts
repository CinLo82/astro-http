import { getCollection } from 'astro:content';
import { db, Clients, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
    await db.insert( Clients ).values([
        { id: 1, name: "Kasim", age: 25, isActive: true },
        { id: 2, name: "Mina", age: 15, isActive: false },
        { id: 3, name: "John", age: 53, isActive: true },
        { id: 4, name: "Jane", age: 27, isActive: false },
        { id: 5, name: "Kasim", age: 35, isActive: true },
    ]);

    const posts = await getCollection('blog');

    await db.insert(Posts).values(
        posts.map((p) => ({
            id: p.id,
            title: p.data.title,
            likes: Math.round(Math.random() * 100),
        }))
    )
       
console.log('Seeded executed');
}
