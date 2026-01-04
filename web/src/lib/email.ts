import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailValues {
	to: string;
	subject: string;
	text: string;
	url: string;
	html: string;
}

export async function sendEmail({ to, subject, url, html }: SendEmailValues) {
	await resend.emails.send({
		from: 'Locci <verification@mail.locci.cloud>',
		to,
		subject,
		text: `Verify your email by visiting this link: ${url}`,
		html
	});
}

function baseTemplate(title: string, content: string) {
	return `
	<!DOCTYPE html>
	<html>
	<body style="margin:0;background:#f9fafb;font-family:Arial,sans-serif;">
		<table width="100%" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center" style="padding:40px 16px;">
					<table style="max-width:480px;background:#ffffff;border-radius:8px;padding:32px;">
						<tr>
							<td style="text-align:center;">
								<h2 style="color:#111827;margin-bottom:12px;">${title}</h2>
								${content}
								<p style="margin-top:32px;font-size:12px;color:#9ca3af;">
									© ${new Date().getFullYear()} Locci
								</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
	</html>
	`;
}

export function verifyEmailTemplate(url: string) {
	return baseTemplate(
		'Verify your email',
		`
		<p style="font-size:14px;color:#374151;">
			Click the button below to verify your email address.
		</p>

		<a href="${url}" style="display:inline-block;margin:24px 0;padding:12px 20px;
			background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;">
			Verify email
		</a>

		<p style="font-size:12px;color:#6b7280;">
			If the button doesn’t work, copy this link:
		</p>
		<p style="font-size:12px;color:#2563eb;word-break:break-all;">
			${url}
		</p>
		`
	);
}

export function resetPasswordTemplate(url: string) {
	return baseTemplate(
		'Reset your password',
		`
		<p style="font-size:14px;color:#374151;">
			Click the button below to reset your password.
		</p>
		<a href="${url}" style="display:inline-block;margin:24px 0;padding:12px 20px;
			background:#dc2626;color:#fff;text-decoration:none;border-radius:6px;">
			Reset password
		</a>
		`
	);
}

export function magicLinkTemplate(url: string) {
	return baseTemplate(
		'Sign in to Locci',
		`
		<p style="font-size:14px;color:#374151;">
			Use the button below to sign in securely.
		</p>
		<a href="${url}" style="display:inline-block;margin:24px 0;padding:12px 20px;
			background:#059669;color:#fff;text-decoration:none;border-radius:6px;">
			Sign in
		</a>
		`
	);
}

// const lastSent = new Map<string, number>();

// export function canSend(email: string) {
// 	const now = Date.now();
// 	const last = lastSent.get(email) ?? 0;

// 	if (now - last < 60_000) return false;

// 	lastSent.set(email, now);
// 	return true;
// }
