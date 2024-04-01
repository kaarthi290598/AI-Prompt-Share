// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/profile/:id*", "/test"] };

import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  }
);

export const config = { matcher: ["/profile/:id*", "/test"] };
