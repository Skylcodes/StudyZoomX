import { NextRequest } from 'next/server';

import { handlers } from '@/lib/auth';

const reqWithOrigin = (req: NextRequest): NextRequest => {
  const { href, origin } = req.nextUrl;
  return new NextRequest(
    href.replace(
      origin,
      new URL(process.env.NEXT_PUBLIC_BASE_URL as string).origin
    ),
    req
  );
};

export const GET = (req: NextRequest) => {
  return handlers.GET(reqWithOrigin(req));
};

export const POST = (req: NextRequest) => {
  return handlers.POST(reqWithOrigin(req));
};
