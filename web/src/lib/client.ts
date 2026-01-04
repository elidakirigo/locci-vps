import { createAuthClient } from 'better-auth/svelte';
// import { passkey } from 'better-auth/client/plugins';
// import { browser } from '$app/environment';

// export let authClient;

// if (browser) {
// 	authClient = createAuthClient({
// 		baseURL: 'http://localhost:5173',
// 		// plugins: [passkey()]
// 	});
// }

export const authClient = createAuthClient({
	baseURL: 'http://localhost:5173', // the base url of your auth server
	// plugins: [passkey]
});
