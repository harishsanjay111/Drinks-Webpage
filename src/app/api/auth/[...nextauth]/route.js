

import mongoose from "mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./../../../model/User";
import bcrypt from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "./../../../../libs/mongoConnect"

export  const authoptions = {
  secret : process.env.SECRET,
  // adapter : MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      id : "credentials",
      name: "Credentials",
      
      
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        const email = credentials?.email;
        const password = credentials?.password;
        

        mongoose.connect(process.env.MONGO_URL);
        
        const user = await User.findOne({email,password});
        console.log(user.password);
        
        const passwordOK = user && bcrypt.compare(password, user.password);
        
       console.log({passwordOK});
        if (passwordOK) { 
          return user; 
        }
        
        return null;
      }
    })
  ]
}
const handler = NextAuth(authoptions)

export {handler as GET, handler as POST}
