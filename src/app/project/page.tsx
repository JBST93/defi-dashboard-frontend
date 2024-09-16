import { Suspense } from 'react';
import ProjectTable from './ProjectTable';
import ProjectStats from './ProjectStats';

async function getProjects() {
  const res = await fetch('https://www.tokendataview.com/api/projects', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch project data');
  }
  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900 ">
          Projects Overview{' '}
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="max-w mx-auto">
            <ProjectTable
              initialProjects={projects}
              filter=""
              searchTerm=""
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
