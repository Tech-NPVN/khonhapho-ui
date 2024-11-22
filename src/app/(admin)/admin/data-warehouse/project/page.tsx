import dynamic from 'next/dynamic';

const ProjectDynamic = dynamic(
  () => import('@/modules/admin/data-warehouse/components').then((res) => res.ProjectIndex),
  {
    ssr: false,
  },
);

const ProjectPage = () => {
  return <ProjectDynamic />;
};

export default ProjectPage;
