import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import RepositoryCard from "../pages/RepositoryCard";

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

export default function Favourites() {
  const [favourites, setFavourites] = useState<Repository[]>([]);

  useEffect(() => {
    setFavourites([]); 
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Favourites</h1>
      <p className="text-gray-600 mb-8">Here are your favourite repositories ⭐</p>

      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No favourites yet</h3>
          <p className="text-gray-600">
            Start searching for repositories and add them to your favourites
          </p>
        </div>
      )}
    </div>
  );
}
