import { PaginationQueryParams } from "@/types/pagination.types";
import { Prisma } from "@prisma/client";
import prisma from '@/prisma';

interface GetBlogsQuery extends PaginationQueryParams {
    id: number;
}

export const getBlogsByUserService = async (query: GetBlogsQuery) => {
    try {
        const {page, sortBy, sortOrder, take, id} = query;

        const whereClause: Prisma.BlogWhereInput = {
            userId: Number(id),
        };

        const blogs =  await prisma.blog.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take: take,
            orderBy: {
                [sortBy]: sortOrder,
            }, include: {user: true}
        })

        const count = await prisma.blog.count({where: whereClause})

        return {
            data: blogs,
            meta: {page, take, total: count}
        }
    } catch (error) {
        throw error;
    }
}