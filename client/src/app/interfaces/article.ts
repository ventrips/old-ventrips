export interface IArticle {
    title: String;
    category: String;
    content: String;
    imageUrl: String;
    uid: String;
    created: String;
    displayName: String;
}

export class Article implements IArticle {
    title = '';
    category = '';
    content = '';
    imageUrl = '';
    uid = '';
    created = '';
    displayName = '';
}
