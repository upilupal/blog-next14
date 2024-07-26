import Image from 'next/image';
import Link from 'next/link';

const social = [
  {
    alt: 'github logo',
    imageUrl: '/github-mark-white.png',
    linkUrl: 'https://github.com/upilupal',
  },
  {
    alt: 'linkedin logo',
    imageUrl: '/linkedin-logo.png',
    linkUrl: 'https://www.linkedin.com/in/naufalhanifcipta/',
  },
];

export const Footer = () => {
  return (
    <main className="bg-primary h-36 md:h-fit">
      <div className="text-secondary container mx-auto p-4">
        <div className="flex md:flex-row flex-col gap-2 items-center justify-between py-2">
          <h1 className="md:text-2xl text-xl font-bold">FIT HUB</h1>
          <p className="text-xs md:text-md">
            © 2024 Naufal Hanif Cipta Darmara, Inc. All rights reserved
          </p>
          <div className="flex gap-5">
            {social.map((social) => {
              return (
                <Link
                  key={social.linkUrl}
                  href={social.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform transform hover:scale-110 hover:opacity-75 duration-300"
                >
                  <div className='w-7 h-7 md:w-9 md:h-9'>
                    <Image
                      src={social.imageUrl}
                      alt={social.alt}
                      fill
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
