export interface IProduct {
    title: String;
    url: String;
    category: String;
    features: Array<String>;
    images: Array<String>;
    content: String;
}

export class Product implements IProduct {
    title = '';
    url = '';
    category = '';
    features = [];
    images = [];
    content = '';
}
