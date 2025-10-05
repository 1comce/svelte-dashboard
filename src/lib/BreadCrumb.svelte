<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	let { links } = $props();
</script>

<Breadcrumb class="mb-5">
	{#each links as link, i}
		<BreadcrumbItem home={link.home} href={i < links.length - 1 ? link.href : undefined}>
			{link.name}
		</BreadcrumbItem>
	{/each}
</Breadcrumb>
