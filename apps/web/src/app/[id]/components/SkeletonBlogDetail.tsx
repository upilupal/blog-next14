import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonBlogDetail = () => {
  return <div className='flex flex-col space-y-3'>
    <div className='space-y-2'>
        <Skeleton className='h-4 max-w-[200px]'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4 max-w-[180px]'/>
    </div>
    <Skeleton className='min-h-[250px] w-full rounded-xl'/>
    <div className='space-y-2 pt-10'>
        <Skeleton className='h-4 max-w-[250px]'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
    </div>
    <div className='space-y-2 pt-10'>
        <Skeleton className='h-4 max-w-[250px]'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
        <Skeleton className='h-4'/>
    </div>
  </div>
}

export default SkeletonBlogDetail