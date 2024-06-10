import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const post = await prisma.post.create({
        data: {
            title: 'My first post',
            content: 'Hello World',
        }
    });
    console.log(post);
}