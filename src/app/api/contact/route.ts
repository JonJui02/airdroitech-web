import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

/**
 * POST /api/contact — enquiry form handler.
 *
 * TODO(phase-4): wire Resend. Send from mail.airdroitech.com, NOT the apex.
 * airdroitech.com's MX points at Proofpoint (mxa/mxb-009aec01.gslb.pphosted.com)
 * and its SPF includes spf-009aec01.pphosted.com. Editing apex mail records to
 * send from the apex risks breaking inbound mail to info@airdroitech.com, which
 * is where every form on this site delivers.
 */
export async function POST(req: Request) {
  const limited = await rateLimit(req, 'contact');
  if (limited) return limited;

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot tripped: accept silently so the bot learns nothing.
  if (parsed.data.company_website) return NextResponse.json({ ok: true });

  // TODO(phase-4): await resend.emails.send({ from: MAIL_FROM, to: MAIL_TO, ... })
  // TODO(phase-4): record the consent flag with a timestamp for the PDPA audit trail.

  return NextResponse.json({ ok: true });
}
