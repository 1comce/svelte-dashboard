<script lang="ts">
	import { Button, Checkbox, Indicator } from 'flowbite-svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte';
	import { TableHeadCell } from 'flowbite-svelte';
	import { EditOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	let { selected = $bindable(Set<string>), Sites } = $props();
	let selectAll: boolean = $state(false);
	let openUser: boolean = $state(false); // modal control
	let openDelete: boolean = $state(false); // modal control

	let current_user: any = $state({});
	// when selectAll flips, update selected
	function toggleRow(id: string, checked: boolean) {
		if (checked) {
			selected.add(id);
		} else {
			selected.delete(id);
		}
		// reassign so Svelte notices
		selected = new Set(selected);

		// keep selectAll in sync
		selectAll = selected.size === Sites.length;
	}

	function toggleAll(checked: boolean) {
		if (checked) {
			selected = new Set(Sites.map((u: any) => u.id));
		} else {
			selected = new Set();
		}
		selectAll = checked;
	}
</script>

<Table>
	<TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
		<TableHeadCell class="w-4 p-4"
			><Checkbox
				bind:checked={selectAll}
				onchange={(e) => toggleAll((e.target as HTMLInputElement).checked)}
			/></TableHeadCell
		>
		{#each ['Site', 'Group', 'Services:Branch (4)', 'Deployment Status', 'Actions'] as title}
			<TableHeadCell class="p-4 font-medium">{title}</TableHeadCell>
		{/each}
	</TableHead>
	<TableBody>
		{#each Sites as site}
			<TableBodyRow class="text-base">
				<TableBodyCell class="w-4 p-4"
					><Checkbox
						checked={selected.has(site.id)}
						onchange={(e: Event) => {
							toggleRow(site.id, (e.target as HTMLInputElement).checked);
							// console.log('change: ', selected);
						}}
					/></TableBodyCell
				>
				<TableBodyCell class="mr-12 space-x-6 p-4 whitespace-nowrap h-full">
					<div class="text-sm font-normal text-gray-500 dark:text-gray-300">
						<div class="text-base font-semibold text-gray-900 dark:text-white">{site.name}</div>
						<div class="text-sm font-normal text-gray-500 dark:text-gray-300">{site.region}</div>
					</div>
				</TableBodyCell>
				<TableBodyCell
					class="max-w-sm truncate overflow-hidden p-4 text-base font-normal text-gray-500 xl:max-w-xs dark:text-gray-300"
				>
					{site.group}
				</TableBodyCell>
				<TableBodyCell class="p-4"
					>{#each site.services as s}
						<div>{s.name}:{s.branch}</div>
					{/each}</TableBodyCell
				>
				<TableBodyCell class="p-4 font-normal">
					{#each site.services as s}
						<div class="flex items-center gap-2">
							<Indicator
								color={s.status === 'Deployed'
									? 'green'
									: s.status === 'Deploying'
										? 'yellow'
										: s.status === 'Error'
											? 'red'
											: 'gray'}
							/>
							{s.status}
						</div>
					{/each}
				</TableBodyCell>
				<TableBodyCell class="space-x-2 p-4">
					<a href={`/deploy/${site.id}`}>
						<Button
							size="sm"
							class="gap-2 px-3"
							onclick={() => ((current_user = site), (openUser = true))}
						>
							<EditOutline size="sm" /> Edit Services
						</Button></a>
					<Button
						color="red"
						size="sm"
						class="gap-2 px-3"
						onclick={() => ((current_user = site), (openDelete = true))}
					>
						<TrashBinSolid size="sm" /> Delete
					</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
