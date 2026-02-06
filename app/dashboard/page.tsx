"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  _id: string;
  title: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/tasks/get", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to load tasks");
          setTasks([]);
          return;
        }
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("Something went wrong");
        setTasks([]);
      })
      .finally(() => setLoading(false));
  };

  const addTask = async () => {
    const token = localStorage.getItem("token");
    if (!token || !title) return;

    try {
      await fetch("/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch("/api/tasks/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Common mistake: missing content-type when body is present, though for DELETE body is optional/discouraged in some strict APIs but we used body in backend.
          // Wait, Next.js Request.json() reads body. DELETE requests CAN have body but some clients/proxies strip it.
          // Ideally ID should be in URL. But my backend code reads from body. 
          // I will use body for now as implemented in backend step 203.
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ id }),
      });
      
      if (res.ok) {
        setTasks(tasks.filter((t) => t._id !== id));
      } else {
        setError("Failed to delete task");
      }
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const startEdit = (task: Task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const updateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token || !editingId || !editTitle) return;

    try {
      const res = await fetch("/api/tasks/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: editingId, title: editTitle }),
      });

      if (res.ok) {
        setTasks(tasks.map((t) => (t._id === editingId ? { ...t, title: editTitle } : t)));
        cancelEdit();
      } else {
        setError("Failed to update task");
      }
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 border-t-transparent dark:border-white dark:border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-6 dark:bg-black">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              Manage your tasks efficiently
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Sign out
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                Your Tasks
              </h2>
              
              {error && (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <ul className="space-y-3">
                {tasks.length === 0 && !error && (
                  <li className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-zinc-400"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </div>
                    <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-white">No tasks yet</p>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Get started by creating a new task.</p>
                  </li>
                )}

                {tasks.map((task) => (
                  <li
                    key={task._id}
                    className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                  >
                    {editingId === task._id ? (
                      <div className="flex w-full gap-2">
                        <input
                          className="flex-1 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <button
                          onClick={updateTask}
                          className="text-sm font-medium text-green-600 hover:underline dark:text-green-400"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-sm font-medium text-zinc-500 hover:underline dark:text-zinc-400"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">{task.title}</span>
                        <div className="flex gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => startEdit(task)}
                            className="text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                 Add New Task
              </h2>
              <div className="space-y-4">
                <textarea
                  className="w-full min-h-[100px] resize-none rounded-lg border border-zinc-200 bg-transparent px-4 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-black/5 dark:border-zinc-800 dark:text-white dark:focus:border-white"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  onClick={addTask}
                  disabled={!title}
                  className="w-full rounded-lg bg-black py-2.5 font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
