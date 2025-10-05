import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import users from '../../data/users.json'; // assuming your array is here

export const load = (async ({ params }) => {
	// Fake delay (e.g. 1.5 seconds)
	await new Promise((resolve) => setTimeout(resolve, 1500));

	// Mock/fake post data
	const user = users.find((u) => u.id === Number(params.slug));

	if (user) {
		return { user };
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
