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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/tasks/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      location.reload();
    } catch (err) {
      setError("Failed to add task");
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
                    <span className="font-medium text-zinc-900 dark:text-zinc-200">{task.title}</span>
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
