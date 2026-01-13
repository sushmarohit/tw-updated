'use client';

import { SchemaMarkup } from './schema-markup';
import { generateServiceSchema, ServiceSchemaInput } from '@/lib/seo/schema-generators';

interface ServiceSchemaProps {
  service: ServiceSchemaInput;
}

/**
 * ServiceSchema Component
 * Generates and adds Service schema for service pages
 */
export function ServiceSchema({ service }: ServiceSchemaProps) {
  const serviceSchema = generateServiceSchema(service);
  return <SchemaMarkup schema={serviceSchema} id="service-schema" />;
}
