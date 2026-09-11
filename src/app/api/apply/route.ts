import { NextResponse } from 'next/server';
import { applicationSchema, validateCv } from '@/lib/schemas';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

/**
 * POST /api/apply — job application handler. Accepts multipart/form-data.
 *
 * TODO(phase-4):
 *   - store the CV in Vercel Blob as PRIVATE; email a signed link, never the
 *     file as an attachment
 *   - confirm the Blob store's region against the PDPA answer in
 *     docs/OPEN-DECISIONS.md before any real applicant data lands in it
 *   - add a retention job; CVs are personal data, not permanent records
 */
export async function POST(req: Request) {
  const limited = await rateLimit(req, 'apply');
  if (limited) return limited;

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  const consentRaw = form.get('consent');
  const parsed = applicationSchema.safeParse({
    name: form.get('name'),
    email: form.get('email'),
    phone: form.get('phone'),
    position: form.get('position'),
    message: form.get('message') ?? '',
    consent: consentRaw === 'on' || consentRaw === 'true',
    company_website: form.get('company_website') ?? '',
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  if (parsed.data.company_website) return NextResponse.json({ ok: true });

  const cv = form.get('cv');
  if (!(cv instanceof File)) {
    return NextResponse.json(
      { ok: false, fieldErrors: { cv: ['Attach your CV or resume.'] } },
      { status: 422 },
    );
  }

  const cvCheck = validateCv(cv);
  if (!cvCheck.ok) {
    return NextResponse.json(
      { ok: false, fieldErrors: { cv: [cvCheck.error] } },
      { status: 422 },
    );
  }

  // TODO(phase-4): const blob = await put(`cv/${crypto.randomUUID()}`, cv, { access: 'private' })
  // TODO(phase-4): notify MAIL_TO with the role, applicant details and the blob link.

  return NextResponse.json({ ok: true });
}
