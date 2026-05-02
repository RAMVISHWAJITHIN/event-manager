import { AccountView, accountViewPaths } from "@neondatabase/auth/react";

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">

      {/* Wrapper Card */}
      <div className="neu-card p-6">

        <AccountView />

      </div>

    </div>
  );
}