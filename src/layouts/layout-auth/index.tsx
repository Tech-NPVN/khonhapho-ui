'use client';

export const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className={`relative bg-[url('/images/auth-background.png')] bg-fixed bg-center bg-no-repeat bg-cover flex justify-center items-center min-h-screen w-full md:py-10 overflow-auto`}
    >
      {children}
    </section>
  );
};
