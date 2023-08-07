import { NextResponse } from "next/server";
import type { NextFetchEvent } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { CONSTANTS } from "./services/config/app-config";
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  try {
    if (CONSTANTS.ENABLE_REDIRECT_FEATURE) {
      const redirect = await fetch(`${CONSTANTS.API_BASE_URL}/${CONSTANTS.API_MANDATE_PARAMS}&method=get_redirecting_urls&entity=signin`, {
        method: "GET",
      }).then((res: any) => res.json());
      const url = request.nextUrl.clone();
      if (url.pathname.startsWith("/_next")) {
        return NextResponse.next();
      }
      const matchingRedirect = redirect.message.find(
        (value: any) => value.from === url.pathname
      );
      if (matchingRedirect) {
        url.pathname = matchingRedirect.to;
        url.search = "";
        return Response.redirect(url, 308);
      } else {
        return NextResponse.next();
      }
    } else {
      console.log("Redirect feature is disabled.");
    }
  } catch (err) {
    console.error("Error fetching redirect data:", err);
    return NextResponse.next();
  }
}
export const config = {
  matcher: "",
};