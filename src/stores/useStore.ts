import create from "zustand";

interface mediaState {
  video: boolean;
  audio: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
}

export const useStore = create<mediaState>((set) => ({
  video: false,
  audio: false,
  toggleVideo: () => set((state) => ({ video: !state.video })),
  toggleAudio: () => set((state) => ({ audio: !state.audio })),
}));
