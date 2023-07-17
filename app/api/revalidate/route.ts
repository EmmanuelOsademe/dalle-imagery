import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
    const tag = req.nextUrl.searchParams.get('collection');
    revalidateTag(tag!);
    return NextResponse.json({revalidated: true, now: Date.now()})
}