'use client';
import Autocomplete from '@/components/Autocomplete';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import useGetBlogs from '@/hooks/api/blog/useGetBlogs';
import { appConfig } from '@/utils/config';
import { useState } from 'react';

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const { data: blogs, meta } = useGetBlogs({
    page,
    take: 6,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <main className="container mx-auto px-4">
      {/* JUMBOTRON */}
      <section className="mt-10">
        <h1 className="text-4xl font-bold text-center ">FIT HUB</h1>
        <p className="md:text-xl text-center ">
          A blog about food, experiences, and recipe
        </p>
        <Autocomplete />
      </section>

      {/* CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {blogs.map((blog, index) => {
          return (
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
          );
        })}
      </section>

      <div className="flex justify-center my-5">
        <Pagination
          total={meta?.total || 0}
          take={meta?.take || 0}
          onChangePage={handleChangePaginate}
        />
      </div>
    </main>
  );
}
