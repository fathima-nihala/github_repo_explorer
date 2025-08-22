

import { useState } from "react";
import { Search, Github, Star } from "lucide-react";
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

interface SearchResponse {
    success: boolean;
    data: {
        total_count: number;
        items: Repository[];
    };
}

export default function DashboardHome({ username }: { username: string | null }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    const API_URL = import.meta.env.VITE_API_BASE_URL;


    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${API_URL}/api/github/search?q=${encodeURIComponent(searchQuery)}`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );

            const data: SearchResponse = await response.json();

            if (data.success) {
                setRepositories(data.data.items);
                setTotalCount(data.data.total_count);
            } else {
                setError("Failed to search repositories");
            }
        } catch (err) {
            setError("Error searching repositories. Please try again.");
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    // ⭐ Add to Favourites
    const addToFavorites = async (repo: Repository) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to add favourites");
                return;
            }

            const response = await fetch(`${API_URL}/api/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(repo),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(`Added "${repo.full_name}" to favourites ⭐`);
            } else {
                setError(data.message || "Failed to add favourite");
            }
        } catch (err) {
            console.error("Error adding favourite:", err);
            setError("Error adding favourite. Please try again.");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome{username ? `, ${username}` : ""} 🎉
                </h1>
                <p className="text-gray-600">Search and discover GitHub repositories</p>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex space-x-4">
                    <div className="flex-1 relative">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search repositories (e.g., react, javascript, wowkid)"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={loading || !searchQuery.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {/* Results */}
            {repositories.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Search Results
                        </h2>
                        <p className="text-gray-600">
                            {totalCount.toLocaleString()} repositories found
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repositories.map((repo) => (
                            <div
                                key={repo.id}
                                className="relative bg-white rounded-lg shadow-sm border p-4 flex flex-col"
                            >
                                <RepositoryCard repo={repo} />

                                {/* Star button */}
                                <button
                                    onClick={() => addToFavorites(repo)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 transition-colors"
                                    title="Add to favourites"
                                >
                                    <Star size={22} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {/* Empty States */}
            {!loading && repositories.length === 0 && searchQuery && !error && (
                <div className="text-center py-12">
                    <Github className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No repositories found
                    </h3>
                    <p className="text-gray-600">Try searching with different keywords</p>
                </div>
            )}

            {!searchQuery && repositories.length === 0 && !loading && (
                <div className="text-center py-12">
                    <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Search GitHub Repositories
                    </h3>
                    <p className="text-gray-600">
                        Enter a keyword above to find repositories
                    </p>
                </div>
            )}
        </div>
    );
}
