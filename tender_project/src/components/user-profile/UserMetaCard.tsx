"use client";
import React from "react";
import Image from "next/image";

export type UserMeta = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
};

export default function UserMetaCard({ user }: { user: UserMeta }) {
  if (!user) return null;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <Image
              width={80}
              height={80}
              src="/images/user/owner.jpg"
              alt={`poza ${user.firstName} ${user.lastName}`}
            />
          </div>
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {user.firstName} {user.lastName}
            </h4>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 xl:text-left">
              {user.companyName}
            </p>
          </div>
          <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end" />
        </div>
      </div>
    </div>
  );
}