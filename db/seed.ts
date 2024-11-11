import { db, Clients } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
    await db.insert( Clients ).values([
        { id: 1, name: "Kasim", age: 25, isActive: true },
        { id: 2, name: "Mina", age: 25, isActive: true },
        { id: 3, name: "John", age: 25, isActive: true },
        { id: 4, name: "Jane", age: 25, isActive: true },
        { id: 5, name: "Kasim", age: 25, isActive: true },
      ]);
}
