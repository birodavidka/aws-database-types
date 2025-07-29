"use client";

import { useUserStore } from "@/lib/store";
import { main } from "framer-motion/client";
import React, { useState, useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { users, fetchUsers, addUser, updateUser, removeUser } = useUserStore();
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex">
          <div className="flex flex-col items-start w-1/2">
            <h1 className="text-xl mb-4">CRUD Felhasználók</h1>
            <div className="flex gap-2 mb-4">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Új felhasználó neve"
                className="border px-2"
              />
              <button
                onClick={() => {
                  addUser(newName);
                  setNewName("");
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                add
              </button>
            </div>
            <ul className="list-disc pl-5">
              {users.map((u, idx) => (
                <li key={`${u.id}-${idx}`} className="flex items-center gap-4">
                  <span>{u.name}</span>
                  <button
                    onClick={() => {
                      const name = prompt("Új név", u.name);
                      if (name) updateUser(u.id, name);
                    }}
                    className="px-2 py-1 bg-yellow-300 rounded"
                  >
                    update
                  </button>
                  <button
                    className="px-2 py-1 bg-red-400 text-white border rounded-xl"
                    onClick={() => removeUser(u.id)}
                  >
                    remove
                  </button>
                  {/* … */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
