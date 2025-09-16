import { createFileRoute, Link } from '@tanstack/react-router';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-96">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Side Kit</h1>
      <p className="text-lg text-gray-400 text-center mb-8 max-w-2xl">
        A ready-to-use starter kit to build scalable, maintainable side projects from scratch. Batteries included:
        monorepo setup, shared tooling, UI library, and API layer.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});
