export interface IProduct {
    title: String;
    category: String;
    url: String;
    features: Array<String>;
    images: Array<String>;
    thumbnail: String;
    dateCreated: String;
    uid: String;
    displayName: String;
    content: String;
}

export class Product implements IProduct {
    title = '';
    category = '';
    url = '';
    features = [];
    images = [];
    thumbnail = '';
    dateCreated = '';
    uid = '';
    displayName = '';
    content = '';
}
