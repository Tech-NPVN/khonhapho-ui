'use client';

import Image from 'next/image';

export const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full md:py-10 overflow-auto">
      <div className="absolute inset-0">
        <Image
          src="/images/auth-background.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          quality={100}
          className="z-[-1]" // Ensures the image stays behind the content
        />
      </div>
      {children}
    </section>
  );
};
