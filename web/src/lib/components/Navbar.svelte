<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { invalidateAll } from '$app/navigation';

	const data = authClient.useSession();
</script>

<nav class="flex items-center justify-between border-b bg-background p-4">
	<a href="/"><h1 class="text-lg font-bold tracking-tight">Locci</h1></a>

	{#if data.user}
		<img src={data.user.image} alt={data.user.name} />
		Hello {data.user.name}
		<Button
			variant="destructive"
			onclick={async () => {
				await authClient.signOut();
				invalidateAll();
			}}>Logout</Button
		>
	{:else}
		<div>
			<a href="/signup">
				<Button variant="outline" class="cursor-pointer">Signup</Button>
			</a>
			<a href="/signin">
				<Button class="cursor-pointer">Login</Button>
			</a>
		</div>
	{/if}
</nav>
