import { z } from 'zod';

/**
 * Server-side validation for both forms.
 *
 * The legacy Contact Form 7 forms declared ZERO required fields — name, email,
 * phone, CV upload and the PDPA consent checkbox were all optional, so an empty
 * POST was a valid submission. Every field below that a human must supply is
 * required here, and the same schema drives the client-side messages.
 */

const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 12582912); // 12 MB

export const ALLOWED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx', '.rtf', '.txt'] as const;

export const ALLOWED_CV_MIME = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/rtf',
  'text/rtf',
  'text/plain',
] as const;

/** Mirrors the filenames in src/content/roles/. Keep the two in sync. */
export const ROLE_SLUGS = [
  'senior-software-engineer-mobile-apps',
  'senior-firmware-test-engineer',
  'product-owner',
  'senior-software-test-engineer',
  'product-designer',
  'customer-experience-manager',
  'inventory-control-specialist',
  'senior-accountant',
] as const;

const consent = z.literal(true, {
  errorMap: () => ({ message: 'Please agree to the privacy policy so we can respond.' }),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  email: z.string().trim().email('Enter an email address we can reply to.').max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a little more — at least 10 characters.').max(4000),
  consent,
  // Honeypot: a real person never fills this. Must arrive empty.
  company_website: z.literal('').optional(),
});

export const applicationSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  email: z.string().trim().email('Enter an email address we can reply to.').max(200),
  phone: z.string().trim().min(7, 'Enter a phone number we can reach you on.').max(40),
  position: z.enum(ROLE_SLUGS, {
    errorMap: () => ({ message: 'Choose the role you are applying for.' }),
  }),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  consent,
  company_website: z.literal('').optional(),
});

export function validateCv(file: File): { ok: true } | { ok: false; error: string } {
  if (file.size === 0) return { ok: false, error: 'Attach your CV or resume.' };

  if (file.size > MAX_UPLOAD_BYTES) {
    const mb = Math.round(MAX_UPLOAD_BYTES / 1048576);
    return { ok: false, error: `That file is over the ${mb} MB limit. Try a smaller PDF.` };
  }

  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!ALLOWED_CV_EXTENSIONS.includes(ext as (typeof ALLOWED_CV_EXTENSIONS)[number])) {
    return { ok: false, error: `Accepted file types: ${ALLOWED_CV_EXTENSIONS.join(' ')}` };
  }

  if (file.type && !ALLOWED_CV_MIME.includes(file.type as (typeof ALLOWED_CV_MIME)[number])) {
    return { ok: false, error: 'That file type is not accepted. Send a PDF if you can.' };
  }

  return { ok: true };
}

export type ContactInput = z.infer<typeof contactSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
