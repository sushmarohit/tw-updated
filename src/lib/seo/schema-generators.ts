/**
 * SEO Schema Generators
 * Utilities for generating Schema.org JSON-LD structured data
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates BreadcrumbList schema for a page
 * @param items Array of breadcrumb items (from home to current page)
 * @returns BreadcrumbList schema object
 */
export function generateBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generates breadcrumb items from a path
 * @param pathname The current pathname (e.g., '/consulting/services/assessment')
 * @param customNames Optional map of path segments to custom names
 * @returns Array of breadcrumb items
 */
export function generateBreadcrumbsFromPath(
  pathname: string,
  customNames?: Record<string, string>
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
  ];

  // Remove leading/trailing slashes and split
  const segments = pathname.split('/').filter(Boolean);

  // Build path incrementally
  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = customNames?.[segment] || formatSegmentName(segment);
    items.push({
      name,
      url: currentPath,
    });
  });

  return items;
}

/**
 * Formats a URL segment into a readable name
 * @param segment URL segment (e.g., 'case-studies')
 * @returns Formatted name (e.g., 'Case Studies')
 */
function formatSegmentName(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed?: string;
  serviceType?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
  url: string;
}

/**
 * Generates Service schema for service pages
 * @param input Service information
 * @returns Service schema object
 */
export function generateServiceSchema(input: ServiceSchemaInput) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    provider: {
      '@type': 'Organization',
      name: input.provider.name,
      url: input.provider.url,
    },
    url: `${BASE_URL}${input.url}`,
  };

  if (input.areaServed) {
    schema.areaServed = input.areaServed;
  }

  if (input.serviceType) {
    schema.serviceType = input.serviceType;
  }

  if (input.offers) {
    schema.offers = {
      '@type': 'Offer',
      url: `${BASE_URL}${input.url}`,
    };

    if (input.offers.price) {
      schema.offers.price = input.offers.price;
    }

    if (input.offers.priceCurrency) {
      schema.offers.priceCurrency = input.offers.priceCurrency;
    }
  }

  return schema;
}
