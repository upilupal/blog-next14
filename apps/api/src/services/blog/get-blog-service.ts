import prisma from "@/prisma"

export const getBlogService = async (id: number) => {
    try {
        const blog = await prisma.blog.findFirst({
            where: {id},
            include: {user: true},
        })

        if(!blog) {
            throw new Error('blog not found')
        }

        return blog;
    } catch (error) {
        throw error
    }
}