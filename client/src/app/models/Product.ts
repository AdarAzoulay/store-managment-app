export interface Product {
    id: number;
    isUploaded: boolean;
    title: string;
    brand: string;
    buyPrice: number;
    sellPrice: number;
    itemId:string;
    photos?: any;
    seller: string;
    photoUrl:string;
    url: string;
    productCategory: string;
    detailedDescription: string;
}

export interface updatePhoto{
    productId: number;
    photoId: number;
}