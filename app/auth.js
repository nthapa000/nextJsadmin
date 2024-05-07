import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/util";
import { User } from "./lib/model";
// import bcrypt from "bcrypt";
// will implement bcrypt currently it is not working

const login = async (credentials) => {
  // console.log("Credentialss",credentials);
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });
    // console.log("User Info",user);
    if (!user) throw new Error("Wrong Credentials");
    const isPasswordCorrect = (
      credentials.password === user.password
    );
    // comparing the password from the login page with the password from which is encrypted in the database
    // console.log(credentials.password);
    if (!isPasswordCorrect) throw new Error("Wrong Credentials");
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("failed to Login");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // I want to send username and image to the auth
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.username = user.username
        token.img = user.img
      }
      return token;
    },
    async session({session, token}){
      if(token){
        session.user.username = token.username
        session.user.img = token.img
      }
      return session;
    },
  }
});
