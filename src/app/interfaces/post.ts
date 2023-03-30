import { User } from "./user";

export interface Post {
    _id?: string;
    title: string;
    desc: string;
    cat: string;
    img?: any;
    author?: User;
    date?: Date;
}
