import { create} from 'zustand'

const useStore = create((set) => ({
    loggedIn: false,
    setLoggedIn: (data) => set(() => ({loggedIn: data}))
}))

export default useStore;