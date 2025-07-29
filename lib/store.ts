import { create } from 'zustand';

interface User { id: number; name: string }

interface UserState {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (name: string) => Promise<void>;
  updateUser: (id: number, name: string) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  fetchUsers: async () => {
    const res = await fetch('/api/users');
    if (!res.ok) { console.error('fetchUsers failed', res.status); return; }
    const users: User[] = await res.json();
    set({ users });
  },
  addUser: async (name: string) => {
    const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    if (!res.ok) throw new Error('Failed to add user');
    const newUser: User = await res.json();
    set({ users: [...get().users, newUser] });
  },
  updateUser: async (id: number, name: string) => {
    const res = await fetch(`/api/users/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    if (!res.ok) throw new Error('Failed to update user');
    const updated: User = await res.json();
    set({ users: get().users.map(u => (u.id === id ? updated : u)) });
  },
  removeUser: async (id: number) => {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
    set({ users: get().users.filter(u => u.id !== id) });
  },
}));