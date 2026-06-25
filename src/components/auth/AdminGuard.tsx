"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getToken } from "@/utils/storage";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
}