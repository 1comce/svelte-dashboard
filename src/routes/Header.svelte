<script lang="ts">
	import { page } from '$app/state';
	export let Links;
</script>

<header class="w-screen">
	<nav class="flex justify-center items-center">
		<ul class="flex gap-3">
			{#each Links as link}
				<li class={page.url.pathname === link.href ? 'bg-blue-50' : ''}>
					<a href={link.href}>{link.name}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
