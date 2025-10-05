import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Sites from '../../data/sites.json'
export const load = (async ({ params }) => {
	// Fake delay (e.g. 1.5 seconds)
	await new Promise((resolve) => setTimeout(resolve, 1500));

	// Mock/fake post data
	const site = Sites.find((u) => u.id === Number(params.slug));

	if (site) {
		return { site: site };
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
