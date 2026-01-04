import { auth } from '$lib/server/auth';
import { redirect, error } from '@sveltejs/kit';

export const actions = {
	default: async ({ url }) => {
		const token = url.searchParams.get('token');
		const callbackURL = url.searchParams.get('callbackURL') ?? '/';

		if (!token) {
			throw error(400, 'Missing token');
		}

		const results = await auth.api.verifyEmail({
			query: {
				token,
				callbackURL
			}
		});

		if (!results?.status) {
			throw error(400, 'Verification failed');
		}

		throw redirect(303, callbackURL);
	}
};
