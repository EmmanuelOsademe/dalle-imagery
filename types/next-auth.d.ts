import NextAuth, {DefaultSession} from "next-auth/next";
import { User } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by 'useSession', 'getSession' and received as a prop on the 'SessionProvider' react context
     */

    interface Session {
        user: User & {
            id: string;
            name: string;
            email: string;
            avatarUrl: string;
        }
    }
}
