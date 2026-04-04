'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RESOURCE_GATE_CHALLENGES } from '@/lib/resource-gate-challenges';
import { trackGateFormSubmit } from '@/lib/analytics/events';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ResourceGateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  templateCode: string;
  gateType: 'full_kit' | 'section_download';
  resourceType?: string;
  onSuccessAfterSubmit?: (downloadUrl: string | null) => void;
};

export function ResourceGateModal({
  open,
  onOpenChange,
  title,
  templateCode,
  gateType,
  resourceType = 'business_case_kit',
  onSuccessAfterSubmit,
}: ResourceGateModalProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState<string>(RESOURCE_GATE_CHALLENGES[0].value);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successDownloadUrl, setSuccessDownloadUrl] = useState<string | null>(null);

  const reset = () => {
    setFirstName('');
    setEmail('');
    setChallenge(RESOURCE_GATE_CHALLENGES[0].value);
    setStatus('idle');
    setErrorMessage('');
    setSuccessDownloadUrl(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!firstName.trim() || !EMAIL_REGEX.test(email.trim())) {
      setErrorMessage('Please enter your first name and a valid email.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/resource-gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          challenge,
          templateCode,
          gateType,
          resourceType,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setErrorMessage(typeof data.error === 'string' ? data.error : 'Something went wrong.');
        return;
      }
      trackGateFormSubmit({ form_type: 'resource_gate', challenge_selected: challenge });
      const url = typeof data.downloadUrl === 'string' && data.downloadUrl ? data.downloadUrl : null;
      setSuccessDownloadUrl(url);
      setStatus('success');
      onSuccessAfterSubmit?.(url);
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[101] w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onPointerDownOutside={(ev) => {
            if (status === 'submitting') ev.preventDefault();
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <Dialog.Title className="heading-h4 pr-8">{title}</Dialog.Title>
            <Dialog.Close
              className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Enter your details to access the download. We will use this to follow up if needed.
          </Dialog.Description>

          {status === 'success' ? (
            <div className="space-y-4">
              <p className="body-default text-gray-700">
                Thank you
                {firstName.trim() ? `, ${firstName.trim()}` : ''}.{' '}
                {successDownloadUrl ? (
                  <>
                    Your template should open in a new tab. We also emailed you the same link
                    {successDownloadUrl.includes('docs.google.com') ? ' and an Excel copy when we could generate one' : ''}.
                  </>
                ) : (
                  <>
                    We saved your request. You should receive an email from us shortly with next steps. If nothing arrives,
                    check your spam folder or reply to any TwelfthKey message and we will resend the link.
                  </>
                )}
              </p>
              {successDownloadUrl ? (
                <p className="text-sm">
                  <a
                    href={successDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 font-medium underline hover:text-teal-700"
                  >
                    Open template again
                  </a>
                </p>
              ) : null}
              <Button type="button" variant="primary" className="w-full" onClick={() => handleOpenChange(false)}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="gate-first-name" className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  id="gate-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="gate-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="gate-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="gate-challenge" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary challenge
                </label>
                <select
                  id="gate-challenge"
                  name="challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                >
                  {RESOURCE_GATE_CHALLENGES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              {errorMessage ? (
                <p className="text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              ) : null}
              <Button type="submit" variant="primary" className="w-full" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting…' : 'Get access'}
              </Button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
