import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  createdAt?: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");

  const token = localStorage.getItem("token");

  const fetchTasks = async (): Promise<void> => {
    try {
      const res = await axios.get<Task[]>(
        import.meta.env.VITE_API_URL + "/api/task",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (): Promise<void> => {
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/task",
        { title },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
  <div className="min-h-screen bg-gray-100">

    {/* Navbar */}
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">
        Task Dashboard
      </h1>
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
