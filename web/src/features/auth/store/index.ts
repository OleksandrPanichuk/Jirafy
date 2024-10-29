import { create } from "zustand"


interface VerifyIdentityStore {
	isIdentityVerified: boolean;
	setIsIdentityVerified: (isIdentityVerified: boolean) => void;
}


export const useVerifyIdentityStore = create<VerifyIdentityStore>(set => ({
	isIdentityVerified: false,
	setIsIdentityVerified: (isIdentityVerified) => set({ isIdentityVerified }),
}))