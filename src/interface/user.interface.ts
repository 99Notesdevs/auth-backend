export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    oauthId?: string;
    oauthProvider?: string;
    phone?: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}