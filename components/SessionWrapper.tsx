"use client";

import {SessionProvider} from "next-auth/react";
import { SessionInterface } from "@/types/common.types";

interface Props {
    children: React.ReactNode;
    session?: SessionInterface;
}

const SessionWrapper: React.FC<Props> = ({children, session}) => {

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default SessionWrapper