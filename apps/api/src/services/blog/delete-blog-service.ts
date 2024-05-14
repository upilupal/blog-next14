import prisma from '@/prisma';

export const deleteBlogService = async (id: number) => {
  try {
    const blog = await prisma.blog.findFirst({
      where: { id },
    });

    if (!blog) {
      throw new Error('invalid blog id');
    }

    await prisma.blog.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  } catch (error) {
    throw error;
  }
};
