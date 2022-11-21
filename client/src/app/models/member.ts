import { Order } from "./order";

export interface Member {
    id:         number;
    username:   string;
    created:    Date;
    lastActive: Date;
    country:    string;
    orders:     Order[];
    products:   any[];
}

export interface MemberWithoutProducts {
    id:         number;
    username:   string;
    created:    Date;
    lastActive: Date;
    country:    string;
    orders:     Order[];

}