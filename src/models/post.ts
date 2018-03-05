import { DateTime } from "ionic-angular";
import { Time } from "@angular/common";
import { User } from './user';

export interface Event {
    id: string;
    type: string;
    info: string;
    venue: string;
    doorsOpen: Time;
    date: DateTime;
    dateCreated: DateTime;
    duration: string;
    fee: number;
    ageRestriction: string;
    user: User;
    poster: any;
}