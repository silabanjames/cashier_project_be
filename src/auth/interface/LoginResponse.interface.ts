export interface LoginResponse{
    access_token: string;
    refresh_token: string;
    user_information: {
        name: string,
        email: string,
        role: string
    }
}

// Bisa juga digantikan dengan type untuk parameter sign in
// export type LoginResponse = {
//     access_token: string;
//     refresh_token: string;
// }