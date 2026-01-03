import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Clock } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <Clock className="w-16 h-16 text-teal-500 mx-auto mb-6" aria-hidden="true" />
        <h1 className="heading-hero text-navy-500 mb-4">Coming Soon</h1>
        <h2 className="heading-h3 text-gray-700 mb-4">We're working on something amazing!</h2>
        <p className="body-default text-gray-600 mb-8">
          This page is currently under development. Check back soon for exciting updates.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              Go to Homepage
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/consulting/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

