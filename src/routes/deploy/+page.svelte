<script lang="ts">
	
	import MetaTag from '../utils/MetaTag.svelte';
	import Sites from '../data/sites.json'
	import Table from './Table.svelte';
	let openUser: boolean = $state(false); // modal control
	let openDelete: boolean = $state(false); // modal control
	let selected: Set<string> = $state(new Set()); // store user ids

	let current_user: any = $state({});
	const path: string = '/test';
	const description: string = 'Deployment dashboard';
	const title: string = 'Deployment dashboard';
	const subtitle: string = 'Deployment dashboard';
</script>

<MetaTag {path} {description} {title} {subtitle} />
<main class="relative h-full w-full overflow-y-auto bg-white dark:bg-gray-800">
	<h1>Deploy Page</h1>
	<div class="p-4">
		<Table bind:selected {Sites} />
		{console.log('parent updated', selected)}
	</div>
</main>
