export interface Product {
    id: number;
    isUploaded: boolean;
    isChecked: boolean; // not in the API
    title: string;
    brand: string;
    buyPrice: number;
    sellPrice: number;
    itemId:string;
    photos?: any;
    seller: string;
    quantitySold: number;
    profit: number;
    uploaded: string;
    photoUrl:string;
    url: string;
    productCategory: string;
    detailedDescription: string;
}

export interface updatePhoto{
    productId: number;
    photoId: number;
}