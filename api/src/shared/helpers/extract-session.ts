import { SESSION_COOKIE_NAME } from "../constants"
import { extractCookie } from "./extract-cookie"


export function extractSession(cookies:string) {
	const session = extractCookie(cookies, SESSION_COOKIE_NAME);

	if (!session) {
		return undefined;
	}
	const id = session.split('.')[0];

	return id.slice(4)
}