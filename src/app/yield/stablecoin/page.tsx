'use client';

import { useState, useEffect } from 'react';
import { fetchProjects } from '@/lib/api';

interface StablecoinProject {
  project: string;
  token: string;
  description: string;
}

// Custom Input component
const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border rounded px-2 py-1 ${className}`}
  />
);

// Custom Table components
const Table = ({ children }) => (
  <table className="w-full border-collapse">{children}</table>
);

const TableHead = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableCell = ({ children }) => (
  <td className="border px-4 py-2">{children}</td>
);
export default function StablecoinProjectsPage() {
  const [projects, setProjects] = useState<StablecoinProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(''); // For error handling

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching stablecoin projects:', error);
        setError(error.message); // Capture error
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stablecoin Projects</h1>

      <Input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full"
      />

      {isLoading ? (
        <p>Loading projects...</p>
      ) : error ? ( // Display error message
        <p>Error: {error}</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.token}>
                <TableCell>{project.project || 'No name available'}</TableCell>
                <TableCell>{project.token || 'No token available'}</TableCell>
                <TableCell>
                  {project.description || 'No description available'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
