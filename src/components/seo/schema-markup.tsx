'use client';

import { useEffect } from 'react';

interface SchemaMarkupProps {
  schema: object | object[];
  id?: string;
}

/**
 * SchemaMarkup Component
 * Renders Schema.org JSON-LD structured data
 * Since this is a client component, we use useEffect to add the script to the head
 */
export function SchemaMarkup({ schema, id = 'schema-markup' }: SchemaMarkupProps) {
  useEffect(() => {
    // Remove any existing script with the same id
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    
    // Add to head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [schema, id]);

  // This component doesn't render anything visible
  return null;
}
