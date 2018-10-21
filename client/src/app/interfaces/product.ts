export interface IProduct {
    name: String;
    url: String;
    category: String;
    features: Array<String>;
    images: Array<String>;
}

export class Product implements IProduct {
    name = '';
    url = '';
    category = '';
    features = [];
    images = [];
}
