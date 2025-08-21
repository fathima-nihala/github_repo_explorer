import { Star, ExternalLink, Github } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export default function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{repo.name}</h3>
            <p className="text-sm text-gray-600">{repo.owner.login}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-yellow-500">
          <Star size={16} />
          <span className="text-sm font-medium">{repo.stargazers_count}</span>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {repo.description || "No description available"}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {repo.language && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {repo.language}
            </span>
          )}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <Github size={16} />
          <span>View</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
