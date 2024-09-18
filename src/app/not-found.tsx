import { Error404 } from '@/components/common';

const NotFoundPage: React.FC = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center w-screen">
      <Error404 />
    </div>
  );
};

export default NotFoundPage;
