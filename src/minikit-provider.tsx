import { ReactNode, useEffect } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'

export default function MiniKitProvider({ children }: { children: ReactNode }) {
	useEffect(() => {
		// Passing appId in the install is optional 
		// but allows you to access it later via `window.MiniKit.appId`
		MiniKit.install("app_1f5f31474d5dd3e3bd5f5d77aabcf627") 
	}, [])

	return <>{children}</>
}


// console.log(MiniKit.isInstalled())