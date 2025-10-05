<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte';
	import { tick } from 'svelte';

	let { data } = $props();

	type Service = { name: string; branch: string; status: string };
	type Site = { id?: number; name: string; region: string; group: string; services: Service[] };

	// reactive site state
	let site = $state<Site>(data.site);

	const STATUS_OPTIONS = ['Idle', 'Deploying', 'Deployed'];

	function addService() {
		site.services.push({ name: '', branch: '', status: 'Idle' });
	}

	function removeService(index: number) {
		site.services.splice(index, 1);
	}

	function moveUp(index: number) {
		if (index <= 0) return;
		const [item] = site.services.splice(index, 1);
		site.services.splice(index - 1, 0, item);
	}

	function moveDown(index: number) {
		if (index >= site.services.length - 1) return;
		const [item] = site.services.splice(index, 1);
		site.services.splice(index + 1, 0, item);
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		await tick();

		console.log('Submitting site payload:', site);

		try {
			const method = site.id ? 'PUT' : 'POST';
			const url = site.id ? `/api/sites/${site.id}` : '/api/sites';
			const res = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(site)
			});

			if (!res.ok) throw new Error(`Save failed: ${res.status}`);
			console.log('Saved response:', await res.json());
		} catch (err) {
			console.error('Submit error:', err);
		}
	}
</script>

<form class="space-y-6 p-0" onsubmit={handleSubmit}>
	<!-- Site meta -->
	<div class="grid grid-cols-6 gap-6">
		<Label class="col-span-6 space-y-2 sm:col-span-2">
			<span>Site Name</span>
			<Input name="name" bind:value={site.name} placeholder="Site 1" class="border outline-none" required />
		</Label>

		<Label class="col-span-6 space-y-2 sm:col-span-2">
			<span>Region</span>
			<Input name="region" bind:value={site.region} placeholder="US-West" class="border outline-none" />
		</Label>

		<Label class="col-span-6 space-y-2 sm:col-span-2">
			<span>Group</span>
			<Input name="group" bind:value={site.group} placeholder="Healthcare" class="border outline-none" />
		</Label>
	</div>

	<!-- Services list -->
	<div class="space-y-4">
		<div class="flex flex-wrap items-center justify-between gap-2">
			<h3 class="text-lg font-medium">Services</h3>
			<Button type="button" onclick={addService}>+ Add service</Button>
		</div>
	
		{#if site.services.length === 0}
			<div class="text-sm text-gray-500">No services yet — click "Add service" to create one.</div>
		{/if}
	
		{#each site.services as service, i}
			<!-- Responsive grid: single column on small screens, 12 columns on sm+ -->
			<div class="p-3 border rounded-md grid grid-cols-1 sm:grid-cols-12 gap-3 sm:items-end">
				<!-- Name -->
				<div class="sm:col-span-5">
					<Label class="block space-y-1">
						<span class="text-sm">Name</span>
						<Input
							name={`services[${i}].name`}
							bind:value={service.name}
							placeholder="API"
							class="border outline-none w-full"
						/>
					</Label>
				</div>
	
				<!-- Branch -->
				<div class="sm:col-span-4">
					<Label class="block space-y-1">
						<span class="text-sm">Branch</span>
						<Input
							name={`services[${i}].branch`}
							bind:value={service.branch}
							placeholder="feature-A"
							class="border outline-none w-full"
						/>
					</Label>
				</div>
	
				<!-- Status -->
				<div class="sm:col-span-2">
					<Label class="block space-y-1">
						<span class="text-sm">Status</span>
						<select
							name={`services[${i}].status`}
							bind:value={service.status}
							class="w-full border rounded px-2 py-1 text-black"
						>
							{#each STATUS_OPTIONS as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
					</Label>
				</div>
	
				<!-- Actions -->
				<div class="sm:col-span-1 flex gap-1 justify-end sm:justify-end mt-2 sm:mt-0">
					<Button size="xs" type="button" onclick={() => moveUp(i)} disabled={i === 0}>↑</Button>
					<Button size="xs" type="button" onclick={() => moveDown(i)} disabled={i === site.services.length - 1}>↓</Button>
					<Button size="xs" color="red" type="button" onclick={() => removeService(i)}>✕</Button>
				</div>
			</div>
		{/each}
	</div>
	

	<!-- Footer actions -->
	<div class="flex items-center justify-end gap-3">
		<Button type="button" onclick={() => (site = data.site)}>Reset</Button>
		<Button type="submit">{site.id ? 'Save changes' : 'Create site'}</Button>
	</div>
</form>

