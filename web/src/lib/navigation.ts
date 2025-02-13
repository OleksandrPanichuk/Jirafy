import { Routes } from "@/constants"
import { redirect } from "next/navigation"


export function notImplemented() {
	return redirect(Routes.NOT_IMPLEMENTED)
}