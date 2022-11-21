export interface Order {
    id:                    number;
    title:                 string;
    photoUrl:              string;
    datePurchased:         Date;
    buyerUsername:         string;
    qty:                   number;
    daysAwaitingShippment: number;
    status:                string;
    buyPrice:              number;
    sellPrice:             number;
    address:               string;
}