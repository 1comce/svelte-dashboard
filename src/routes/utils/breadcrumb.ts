// src/lib/utils/breadcrumb.ts
export interface BreadcrumbLink {
	name: string;
	href?: string;
	home?: boolean;
}

/**
 * Generate breadcrumb links from a URL pathname
 * @param pathname e.g. "/crud/users/list"
 * @param overrides optional map to rename segments
 */
export function generateBreadcrumbs(
	pathname: string,
	overrides: Record<string, string> = {}
): BreadcrumbLink[] {
	const parts = pathname.split('/').filter(Boolean);

	const links: BreadcrumbLink[] = [
		{ name: 'Home', href: '/', home: true }
	];

	parts.forEach((part, i) => {
		const href = '/' + parts.slice(0, i + 1).join('/');
		const name = overrides[part] ?? capitalize(part);

		links.push({
			name,
			href
		});
	});

	// last breadcrumb shouldn't have href
	if (links.length > 0) {
		links[links.length - 1].href = undefined;
	}

	return links;
}

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}
