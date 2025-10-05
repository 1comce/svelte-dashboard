<script lang="ts">
	import '../app.css';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { generateBreadcrumbs } from './utils/breadcrumb';
	import BreadCrumb from '$lib/BreadCrumb.svelte';
	interface Route {
		path: string;
	}

	let { children, data }: LayoutProps = $props();
	const routes: Route[] = data.posts;
	const docsRoute = routes.filter((route) => route.path !== '').map((route) => route.path);

	let drawerHidden = $state(false);
	let links = $derived(generateBreadcrumbs(page.url.pathname));
</script>

<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar bind:drawerHidden />
</header>
<div class="overflow-hidden lg:flex">
	<Sidebar bind:drawerHidden {docsRoute} />
	<div
		class="relative h-full w-full overflow-y-auto pt-[70px] lg:ml-64 bg-white dark:bg-gray-800 dark:text-white"
	>
		<BreadCrumb {links} />
		{@render children()}
	</div>
</div>
