declare module "*.module.css" {
    const content: Record<string, string>;
    export default content;
  }

interface User {
//     id          String @unique
//   accessToken String @unique

//   displayName String
//   username    String
//   email       String

//   photo String?

//   company  String?
//   location String?

//   joinedAt DateTime @default(now())

    id: string;
    accessToken: string;
    displayName: string;
    username: string;
    email: string;
    photo?: string;
    company?: string;
    location?: string;
    joinedAt: string;
}