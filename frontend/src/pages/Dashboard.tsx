import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { LayoutDashboard, Star } from "lucide-react";
import DashboardHome from "../components/DashboardHome";
import Favourites from "../components/Favourites";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface DashboardProps {
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export default function Dashboard({ setIsAuthenticated }: DashboardProps) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_BASE_URL;    


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await axios.get(`${API_URL}/api/auth/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.success) {
                    setUsername(res.data.data.username);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                navigate("/login"); // redirect if token invalid/expired
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        setIsAuthenticated(false); // 👈 update parent auth state
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-white shadow-lg flex flex-col transition-all duration-300 border-r border-gray-200`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2
                        className={`text-xl font-bold text-gray-800 ${!isSidebarOpen && "hidden"
                            }`}
                    >
                        GitHub Search
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? "⏴" : "⏵"}
                    </button>
                </div>

                {/* Sidebar Nav */}
                <nav className="flex-1 mt-4">
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setActiveTab("dashboard")}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg mx-2 hover:bg-gray-100 transition-colors text-left ${activeTab === "dashboard"
                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                    : "text-gray-700"
                                    }`}
                            >
                                <LayoutDashboard size={20} />
                                {isSidebarOpen && "Dashboard"}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab("favourites")}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg mx-2 hover:bg-gray-100 transition-colors text-left ${activeTab === "favourites"
                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                    : "text-gray-700"
                                    }`}
                            >
                                <Star size={20} />
                                {isSidebarOpen && "Favourites"}
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 border-t border-gray-200">
                    {username && isSidebarOpen && (
                        <div className="mb-3 text-sm text-gray-600">
                            Logged in as{" "}
                            <span className="font-medium text-gray-800">{username}</span>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                        {isSidebarOpen ? "Logout" : "⏻"}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === "dashboard" && <DashboardHome username={username} />}
                {activeTab === "favourites" && <Favourites />}
            </div>
        </div>
    );
}
