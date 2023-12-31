

export interface UserModel {
    id: number;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    userRole: string;
}