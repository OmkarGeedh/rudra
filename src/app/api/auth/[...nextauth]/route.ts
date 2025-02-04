import { get } from "http";
import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";


const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [ 
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: {},
              password: {}
            },
            async authorize(credentials, req) {
                console.log({credentials});
                const response = await sql`
                SELECT * WHERE email = ${credentials?.email}`;
                const user = response.rows[0];
                const passwordCorrect = await compare(
                    credentials?.password ||"", user.password);
                console.log({ passwordCorrect });
                
                if(passwordCorrect){
                    return{
                        id: user.id,
                        email: user.email,
                    };
                }
                console.log({ passwordCorrect });
                return null;

            },

        }),
    ],
});

export { handler as GET, handler as POST };