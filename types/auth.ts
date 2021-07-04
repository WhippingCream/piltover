export interface OrnnUser {
  id: number;
  username: string;
  accessToken: string;
  gender?: "male" | "female";
  birth?: Date;
}
