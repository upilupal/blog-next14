'use client';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import AuthGuard from '@/hoc/AuthGuard';
import useGetBlogsById from '@/hooks/api/blog/useGetBlogsById';
import { useAppSelector } from '@/redux/hooks';
import { appConfig } from '@/utils/config';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProfilPage = () => {
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const {
    data: blogs,
    meta,
    isLoading,
  } = useGetBlogsById({
    id: id,
    page,
    take: 6,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="flex flex-col mx-auto md:container px-4 justify-center">
      <h1 className="font-semibold md:text-3xl text-xl text-primary md:ml-8">
        Your Blogs
      </h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-10 md:my-0 lg:h-[calc(100vh-15.25rem)]">
          <div className='w-[300px] h-[300px]  relative'>
            <Image
              src={'/File searching-amico.svg'}
              alt="blank data"
              fill
              className="absolute"
            />
          </div>
          <p className="text-center text-lg lg:text-xl ">
            You haven&apos;t posted any blogs yet.
            <span>
              <Link href={'/write'} className="text-blue-700 hover:opacity-50">
                {' '}
                Write blog
              </Link>
            </span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
          {blogs?.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              author={blog.user.fullName}
              category={blog.category}
              description={blog.description}
              imageUrl={appConfig.baseUrl + `/assets${blog.thumbnail}`}
              createdAt={new Date(blog.createdAt)}
              blogId={blog.id}
            />
          ))}
        </div>
      )}

      <div className="mx-auto my-5">
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </div>
  );
};

export default AuthGuard(ProfilPage);
