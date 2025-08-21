
import { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { LayoutDashboard, Star } from "lucide-react";
import axios from "axios";

interface DashboardProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function DashboardHome({ username }: { username: string | null }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome{username ? `, ${username}` : ""} 🎉
      </h1>
      <p className="text-gray-700">This is your dashboard overview.</p>
    </div>
  );
}

function Favourites() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Favourites</h1>
      <p className="text-gray-700">Here are your favourite repositories ⭐</p>
    </div>
  );
}

export default function Dashboard({ setIsAuthenticated }: DashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.success) {
          setUsername(response.data.data.username);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`text-xl font-bold ${!isSidebarOpen && "hidden"}`}>
            MyApp
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "⏴" : "⏵"}
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg mx-2 hover:bg-gray-200 ${
                    isActive ? "bg-gray-200 font-semibold" : "text-gray-700"
                  }`
                }
              >
                <LayoutDashboard size={20} />
                {isSidebarOpen && "Dashboard"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="favourites"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg mx-2 hover:bg-gray-200 ${
                    isActive ? "bg-gray-200 font-semibold" : "text-gray-700"
                  }`
                }
              >
                <Star size={20} />
                {isSidebarOpen && "Favourites"}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardHome username={username} />} />
          <Route path="favourites" element={<Favourites />} />
        </Routes>
      </div>
    </div>
  );
}
