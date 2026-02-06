import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 dark:bg-black">
      <div className="w-full max-w-4xl text-center">
        <h1 className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-white dark:via-zinc-200 dark:to-zinc-500 sm:text-7xl">
          Primetrade Backend Assignment
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A full-stack application demonstrating secure authentication, role-based access control, 
          and CRUD operations with Next.js and MongoDB.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-zinc-900 px-8 font-medium text-white transition-all duration-300 hover:bg-zinc-800 hover:w-40 hover:ring-2 hover:ring-zinc-900 hover:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:hover:ring-white dark:hover:ring-offset-black"
          >
            <span className="mr-2">Get Started</span>
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
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          
          <div className="flex gap-4">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-3 text-left">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">Secure Auth</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              JWT-based authentication with bcrypt password hashing and secure cookies.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">Modern Stack</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Built with Next.js 14, Tailwind CSS, and MongoDB for scalability.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">Type Safe</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Full TypeScript support across frontend and backend for robust code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
