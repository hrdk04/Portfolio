import ProjectsComponent from '../components/Projects';

export default function ProjectsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <ProjectsComponent featuredOnly={false} />
    </div>
  );
}
