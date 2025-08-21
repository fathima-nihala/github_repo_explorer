
import { useEffect, useState } from "react";
import axios from "axios";
import { Star, Trash2 } from "lucide-react";
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

// ✅ backend response type
interface FavoriteResponse {
  _id: string;
  userId: string;
  repoId: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  htmlUrl: string;
  owner?: {
    login: string;
    avatar_url: string;
  };
}

// ✅ helper to add auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export default function Favourites() {
  const [favourites, setFavourites] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ fetch favourites
  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const res = await axios.get<{ data: FavoriteResponse[] }>(
        "http://localhost:5000/api/favorites",
        getAuthHeaders()
      );

      const mappedData: Repository[] = res.data.data.map((repo: FavoriteResponse) => ({
        id: repo.repoId,
        name: repo.name,
        full_name: repo.fullName,
        description: repo.description,
        html_url: repo.htmlUrl,
        stargazers_count: repo.stargazersCount,
        language: repo.language,
        owner: {
          login: repo.owner?.login || "unknown",
          avatar_url: repo.owner?.avatar_url || "",
        },
      }));

      setFavourites(mappedData);
    } catch (err) {
      console.error("Error fetching favourites:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ remove favourite
  const removeFavourite = async (repoId: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/favorites/${repoId}`,
        getAuthHeaders()
      );
      setFavourites((prev) => prev.filter((repo) => repo.id !== repoId));
    } catch (err) {
      console.error("Error removing favourite:", err);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Favourites</h1>
      <p className="text-gray-600 mb-8">
        Here are your favourite repositories ⭐
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((repo) => (
            <div key={repo.id} className="relative">
              <RepositoryCard repo={repo} />
              <button
                onClick={() => removeFavourite(repo.id)}
                className="absolute top-2 right-2 p-2 bg-red-100 hover:bg-red-200 rounded-full"
                title="Remove from favourites"
              >
                <Trash2 className="h-5 w-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favourites yet
          </h3>
          <p className="text-gray-600">
            Start searching for repositories and add them to your favourites
          </p>
        </div>
      )}
    </div>
  );
}
