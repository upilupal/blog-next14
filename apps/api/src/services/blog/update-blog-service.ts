import prisma from '@/prisma';
import { Blog } from '@prisma/client';
import { join } from 'path';
import fs from 'fs';


const defaultDir = '../../../public/images/';
export const updateBlogService = async (
  id: number,
  body: Partial<Blog>,
  file?: Express.Multer.File,
) => {
  try {
    const { title } = body;

    const blog = await prisma.blog.findFirst({
      where: { id },
    });
    if (!blog) {
      throw new Error('blog not found');
    }

    if (title) {
      const blogTitle = await prisma.blog.findFirst({
        where: {
          title: { equals: title },
        },
      });
      if (blogTitle) {
        throw new Error('title already in use');
      }
    }

    if (file) {
      body.thumbnail = `/images/${file.filename}`;
      const imagePath = join(__dirname, '../../../public' + blog.thumbnail);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return await prisma.blog.update({
      where: { id },
      data: { ...body },
    });
  } catch (error) {
    const imagePath = join(__dirname, defaultDir + file?.filename);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    throw error;
  }
};