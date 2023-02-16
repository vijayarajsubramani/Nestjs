import { Document } from 'mongoose';

export interface Users extends Document{
    id:string,
    name:string,
    email:string,
    mobile:string,
    password:string
    role:string,
    avatar:string,
    isActive:boolean
}