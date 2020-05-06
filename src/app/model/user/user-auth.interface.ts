export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserSignupRequest {
    username?: string;
    name: string; // Display name for the user.
    first_name?: string;
    last_name?: string;
    email: string;
    url?: string;
    description?: string;
    locale?: string;
    nickname?: string;
    // slug: string;
    password: string;
    roles: Array<String>;
    // meta
}
