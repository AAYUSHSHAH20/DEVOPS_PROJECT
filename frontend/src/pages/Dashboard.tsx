import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  createdAt?: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTasks = async (): Promise<void> => {
    try {
      const res = await axios.get(
        "/api/task",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Tasks response:", res.data); // Debug log
      
      // Ensure it's an array
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setTasks([]);
      }
    } catch (error: any) {
      console.error("Fetch tasks error:", error.response?.data || error);
      
      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const addTask = async (): Promise<void> => {
    if (!title.trim()) return;
    
    try {
      await axios.post(
        "/api/task",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTitle("");
      fetchTasks();
    } catch (error: any) {
      console.error("Add task error:", error.response?.data || error);
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      await axios.delete(
        `/api/task/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTasks();
    } catch (error: any) {
      console.error("Delete task error:", error.response?.data || error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">
          Task Dashboard
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-3xl mx-auto mt-8 p-6">

        {/* Add Task Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add New Task
          </h2>

          <div className="flex gap-3">
            <input
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="Enter task title"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />

            <button
              onClick={addTask}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Add
            </button>
          </div>

        </div>

        {/* Task List */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Your Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No tasks found.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-gray-700 font-medium">
                    {task.title}
                  </span>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>

    </div>
  );
}