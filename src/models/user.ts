export interface User{
    password: any;
    email: string;
    photoURL: string;
    about: string;
    Uid: any;
}

export interface Profile {
    displayName: string;
    fullname: string;
    gender: string;
    photoURL: string;
    about: string;
    city: string;
    contact?: Contact,
    social?: SocialNetworks
}

export interface Contact {
    cellnumber: number;
    email: string;
}

export interface SocialNetworks {
    facebook: string;
    twitter: string;
    instagram: string;
    website: string;
}