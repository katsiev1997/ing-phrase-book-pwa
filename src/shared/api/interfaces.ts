import { User } from "@prisma/client";

export interface AuthResponse {
    authenticated: boolean;
    user?: User;
    error?: string;
}
export interface LoginResponse {
    success: boolean;
    error?: string;
}
