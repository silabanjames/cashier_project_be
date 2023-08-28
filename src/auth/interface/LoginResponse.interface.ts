export interface LoginResponse{
    access_token: string;
    refresh_token: string;
}

// Bisa juga digantikan dengan type untuk parameter sign in
// export type LoginResponse = {
//     access_token: string;
//     refresh_token: string;
// }