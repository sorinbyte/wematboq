"use client";

import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phone?: string;
  jobTitle?: string;
  companyAddress?: string;
  companyCityState?: string;
  companyCountry?: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const userId = 1; // 🔧 Hardcoded for now

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) return;
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profil Utilizator
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={user} />
          <UserInfoCard user={user} />
          {/* <UserAddressCard user={user} /> */}
        </div>
      </div>
    </div>
  );
}