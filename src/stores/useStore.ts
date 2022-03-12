import create from "zustand/react";

export const useStore = create((set) => ({
  video: false,
  audio: false,
  toggleVideo: () => set((state) => ({ video: !state.video })),
  toggleAudio: () => set((state) => ({ audio: !state.audio })),
}));
