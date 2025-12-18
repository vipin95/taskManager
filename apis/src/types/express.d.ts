// src/types/express.d.ts

interface AuthUser {
    id: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;  // Use your own type here
    }
  }
}

export {};