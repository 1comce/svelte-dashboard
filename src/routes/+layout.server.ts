import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    return {
        posts : [
		{ path: '/', name: 'Home' },
		{ path: '/about', name: 'About' },
		{ path: '/sverdle', name: 'Sverdle' },
		{ path: '/test', name: 'Test' }
	]
    };
}) satisfies LayoutServerLoad;