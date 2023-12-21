import { create } from 'zustand'
import { TStore } from '../types/store'

export const useStore = create<TStore>()((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
}))

