'use client';

import { usePathname } from 'next/navigation';
import { SchemaMarkup } from './schema-markup';
import {
  generateBreadcrumbListSchema,
  generateBreadcrumbsFromPath,
  BreadcrumbItem,
} from '@/lib/seo/schema-generators';

interface PageSchemaProps {
  customBreadcrumbs?: BreadcrumbItem[];
  breadcrumbNameMap?: Record<string, string>;
}

/**
 * PageSchema Component
 * Automatically generates and adds BreadcrumbList schema to the page
 */
export function PageSchema({ customBreadcrumbs, breadcrumbNameMap }: PageSchemaProps) {
  const pathname = usePathname();

  // Use custom breadcrumbs if provided, otherwise generate from pathname
  const breadcrumbs = customBreadcrumbs || generateBreadcrumbsFromPath(pathname, breadcrumbNameMap);
  const breadcrumbSchema = generateBreadcrumbListSchema(breadcrumbs);

  return <SchemaMarkup schema={breadcrumbSchema} id="breadcrumb-schema" />;
}
