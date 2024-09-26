'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectTableProps {
  initialProjects: ProjectData[];
  filter: string | null;
  searchTerm: string;
}

export interface ProjectData {
  type: string;
  price: number;
  token: string;
  price_day_delta: number;
  price_7d_delta: number;
  marketCap: number;
  tvl: number;
  tvl_day_delta: number;
  website: string;
  forum: string;
  project: string;
  logo?: string;
  category: string;
  index?: number; // Add this line
}

export default function ProjectTable({
  initialProjects,
  filter,
  searchTerm: initialSearchTerm,
}: ProjectTableProps) {
  const [projects] = useState<ProjectData[]>(
    initialProjects.map((project, index) => ({ ...project, index: index + 1 }))
  );
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectData[]>(initialProjects);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [activeFilter, setActiveFilter] = useState<string | null>(filter);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    const filtered = projects.filter((p) => {
      const matchesFilter =
        !activeFilter || p.type.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        p.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [activeFilter, projects, searchTerm]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const resetTable = () => {
    setFilteredProjects(initialProjects);
    setSortColumn(null);
    setSortDirection('asc');
    setActiveFilter(null);
    setSearchTerm('');
  };

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (!sortColumn) return 0;

      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredProjects, sortColumn, sortDirection]);

  const formatUSD = (price: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(price);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead className="sticky top-0 z-20 bg-amber-400 text-xs">
            <tr>
              {[
                '#',
                'Token',
                'Type',
                'Price',
                '24h Change',
                '7d Change',
                'Market Cap',
                'Pegged Against',
                'Farming',
              ].map((header, index) => (
                <th
                  key={header}
                  className={`p-2 sm:p-4 text-left text-brown-800 font-semibold whitespace-nowrap cursor-pointer ${
                    index === 0 ? 'sticky left-0 z-30 bg-amber-400' : ''
                  } ${header === 'Type' ? 'hidden sm:table-cell' : ''}`}
                  onClick={() =>
                    handleSort(header.toLowerCase().replace(' ', '_'))
                  }
                >
                  {header}{' '}
                  {sortColumn === header.toLowerCase().replace(' ', '_') &&
                    (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project, index) => (
              <tr
                key={project.index}
                className={
                  index % 2 === 0
                    ? 'bg-amber-50'
                    : 'bg-white hover:bg-amber-100 transition-colors'
                }
              >
                <td>
                  <span className="text-xs sm:text-sm text-gray-500 w-6 sm:w-8 text-center">
                    #{project.index}
                  </span>
                </td>
                <td className="p-2 sm:p-4 whitespace-nowrap sticky left-0 z-10 bg-inherit">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex items-center space-x-2">
                      {project.logo ? (
                        <Image
                          src={project.logo}
                          alt={`${project.token} logo`}
                          width={20}
                          height={20}
                          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                        />
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full"></div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {project.token || 'N/A'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {project.project}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-1 sm:p-4 text-s whitespace-nowrap hidden sm:table-cell">
                  {project.type}
                </td>
                <td className="p-1 sm:p-4 text-right font-semibold whitespace-nowrap">
                  {formatUSD(project.price)}
                </td>
                <td
                  className={`p-1 sm:p-4 whitespace-nowrap ${
                    project.price_day_delta >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {project.price_day_delta >= 0 ? '▲' : '▼'}{' '}
                  {Math.abs(project.price_day_delta).toFixed(2)}%
                </td>
                <td
                  className={`p-1 sm:p-4 whitespace-nowrap ${
                    project.price_7d_delta >= 0
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {project.price_7d_delta >= 0 ? '▲' : '▼'}{' '}
                  {Math.abs(project.price_7d_delta).toFixed(2)}%
                </td>
                <td className="p-1 sm:p-4 whitespace-nowrap text-right font-semibold">
                  {formatUSD(project.marketCap, 0)}
                </td>
                <td className="p-1 sm:p-4 whitespace-nowrap">USD</td>

                <td className="p-1 sm:p-4 whitespace-nowrap">
                  <div className="flex space-x-1 sm:space-x-2">
                    <Link
                      href={`/yield?search=${encodeURIComponent(
                        project.token
                      )}`}
                      className="text-blue-600 hover:underline"
                    >
                      Yields
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
