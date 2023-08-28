import axios from "axios";
import { create } from "zustand";

const API = import.meta.env.VITE_API;
export const currentLoggedInUserInfoStore = create((set) => ({
  myInfo: null,
  getMyinfo: async () => {
    await axios
      .get(`${API}/user/info`, { withCredentials: true })
      .then((res) => set((state) => ({ myInfo: res.data.data })))
      .catch((err) => alert(err));
  },
}));

export const useStore = create((set) => ({
  searchUserId: "arjun",
  setSearchUserID: (id) => set((state) => ({ searchUserId: id })),
}));
export const currentUserStore = create((set) => ({
  currentUserId: null,
  currentReceiverId: null,
  setCurrentUserID: (data) => set((state) => ({ currentUserId: data })),
  setcurrentReceiverId: (data) => set((state) => ({ currentReceiverId: data })),
}));
