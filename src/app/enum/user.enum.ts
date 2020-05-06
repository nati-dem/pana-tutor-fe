export enum UserRole {
    INSTRUCTOR = 'instructor',
    CONTRIBUTOR = 'contributor', // moderator
    ADMINISTRATOR = 'administrator', // we dont set admin from UI
    SUBSCRIBER = 'subscriber', // student
    POTENTIAL_INSTRUCTOR = 'potential_instructor' // pending instructor signup
}
