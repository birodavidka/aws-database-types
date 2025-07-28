"use client";

import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold">Sign in first!</p>
          </div>
        ) : (
          <div className="flex">
            {/* LEFT */}
            <div className="flex flex-col gap-4 w-1/2">
              <h1 className="text-3xl font-bold">Amazon RDS</h1>
              <p className="text-lg">
                Amazon Relational Database Service (RDS) is a managed service
                that simplifies the setup, operation, and scaling of relational
                databases in the cloud.
              </p>
            </div>
            {/* RIGHT */}
            <div className="flex flex-col gap-4 w-1/2">
              <h2 className="text-2xl font-semibold">Key Features</h2>
              <ul className="list-disc pl-5">
                <li>Automated backups and snapshots</li>
                <li>Multi-AZ deployments for high availability</li>
                <li>Read replicas for improved performance</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
