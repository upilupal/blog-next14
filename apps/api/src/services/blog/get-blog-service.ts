import prisma from "@/prisma"

export const getBlogService = async (id: number) => {
    try {
        const blog = await prisma.blog.findFirst({
            where: {id, deletedAt: null},
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