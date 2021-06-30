import { User } from "next-auth";

export interface PiltoverSession {
  user: User;
  ornnUser: string;
}
