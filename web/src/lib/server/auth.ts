import { betterAuth } from 'better-auth';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import {
	BETTER_AUTH_URL,
	BETTER_AUTH_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';

import { db } from './db';
import { svelteCookies } from './auth-svelte-cookies';
import { resetPasswordTemplate, sendEmail, verifyEmailTemplate } from '$lib/email';

export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	plugins: [svelteCookies()],

	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Reset your Password',
				url,
				text: `Reset your Password: ${url}`,
				html: resetPasswordTemplate(url)
			});

			console.log(`Send reset password email for ${user.email} url ${url}`);
			if (!url.includes(BETTER_AUTH_URL)) {
				console.log(`BUG: url should be ${BETTER_AUTH_URL}/api/auth${url}`);
			}
		}
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			const base_url = `${BETTER_AUTH_URL}/api/auth${url}`;

			await sendEmail({
				to: user.email,
				subject: 'Verify your email',
				url,
				text: `Verify your email: ${base_url}`,
				html: verifyEmailTemplate(base_url)
			});

			console.log(`Send verification email for ${user.email} url ${url}`);
			if (!url.includes(BETTER_AUTH_URL)) {
				console.log(`BUG: url should be ${BETTER_AUTH_URL}/api/auth${url}`);
			}
		}
	}
	// magicLink: {
	// 	sendMagicLinkEmail: async ({ email,url, token }) => {
	// 		const url = `http://localhost:5173/magic-link?token=${token}`;
	// 		await sendEmail({
	// 			to: email,
	// 			subject: 'Sign in to Locci',
	// 			html: magicLinkTemplate(url),
	// 			text: `Sign in: ${url}`
	// 		});
	// 	}
	// }
});
