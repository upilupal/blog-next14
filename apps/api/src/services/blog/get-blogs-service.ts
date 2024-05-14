import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { PaginationQueryParams } from '@/types/pagination.types';

interface GetBlogsQuery extends PaginationQueryParams {
    search : string;
} // types search dipisah karena tidak semua fitur butuh search

export const getBlogsService = async (query: GetBlogsQuery) => {
  try {
    const {page, sortBy, sortOrder, take, search} = query;
    const whereClause: Prisma.BlogWhereInput = {
        title: {contains: search},
        deletedAt: null,
    };
    const blogs = await prisma.blog.findMany({
         where: whereClause,
         skip: (page - 1) * take,
         take: take,
         orderBy: {
            [sortBy]: sortOrder,
         },
         include: {user: true}
         });

         const count = await prisma.blog.count({where: whereClause});

         return {
            data: blogs,
            meta: {page, take, total: count}
         }

  } catch (error) {
    throw error;
  }
};
