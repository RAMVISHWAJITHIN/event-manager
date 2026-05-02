import { AuthView } from "@neondatabase/auth/react";

export const dynamicParams = false;

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">

      {/* Wrapper */}
      <div className="neu-card w-full max-w-md p-8 space-y-6">

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">
            {path === "sign-up" ? "Create account" : "Welcome back"}
          </h1>
          <p className="text-sm text-muted">
            {path === "sign-up"
              ? "Start managing your events"
              : "Sign in to continue"}
          </p>
        </div>

        {/* Auth UI */}
        <div>
          <AuthView path={path} />
        </div>

      </div>

    </main>
  );
}