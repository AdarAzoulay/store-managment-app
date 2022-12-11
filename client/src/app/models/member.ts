import { Order } from "./order";

export interface Member {
    id:         number;
    username:   string;
    created:    Date;
    lastActive: Date;
    country:    string;
    additionalProfit : number;
    orders:     Order[];
    products:   any[];
}

