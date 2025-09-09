'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ForumDiscussion {
  id: string;
  title: string;
  url: string;
  protocol: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: string;
  author: string;
  isHot: boolean;
}

interface ForumDiscussionsProps {
  discussions: ForumDiscussion[];
}

export default function ForumDiscussions({
  discussions,
}: ForumDiscussionsProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'replies' | 'views' | 'recent'>(
    'replies'
  );

  const protocols = [
    'all',
    ...Array.from(new Set(discussions.map((d) => d.protocol))),
  ];

  const filteredDiscussions = discussions
    .filter(
      (d) => selectedProtocol === 'all' || d.protocol === selectedProtocol
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'replies':
          return b.replies - a.replies;
        case 'views':
          return b.views - a.views;
        case 'recent':
          return (
            new Date(b.lastActivity).getTime() -
            new Date(a.lastActivity).getTime()
          );
        default:
          return 0;
      }
    })
    .slice(0, 12);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          🔥 Hot Forum Discussions
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Protocol Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Protocol:
            </label>
            <select
              value={selectedProtocol}
              onChange={(e) => setSelectedProtocol(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {protocols.map((protocol) => (
                <option
                  key={protocol}
                  value={protocol}
                >
                  {protocol === 'all' ? 'All Protocols' : protocol}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'replies' | 'views' | 'recent')
              }
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="replies">Most Replies</option>
              <option value="views">Most Views</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiscussions.map((discussion) => (
          <div
            key={discussion.id}
            className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
              discussion.isHot
                ? 'border-orange-200 bg-orange-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {discussion.protocol}
                </span>
                {discussion.isHot && (
                  <span className="text-xs font-medium px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                    🔥 Hot
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">
                {discussion.category}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              <Link
                href={discussion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                {discussion.title}
              </Link>
            </h3>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span>by {discussion.author}</span>
              <span>{discussion.lastActivity}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  💬 {discussion.replies.toLocaleString()}
                </span>
                <span className="flex items-center">
                  👁️ {discussion.views.toLocaleString()}
                </span>
              </div>
              <Link
                href={discussion.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            No discussions found for the selected filters.
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-4">
          Discussions are updated every 30 minutes from official governance
          forums.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {protocols.slice(1).map((protocol) => (
            <Link
              key={protocol}
              href={`#${protocol.toLowerCase()}`}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {protocol} Forum
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
