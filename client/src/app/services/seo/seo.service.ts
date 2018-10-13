import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  addTwitterCard(title, description, img) {
    title = `Ventrips - ${_.startCase(title)}`;
    description = _.startCase(description);

    // Set HTML Document Title
    this.title.setTitle(title);

    // Add Twitter Card Metatags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@Ventrips' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: img });
  }
}
