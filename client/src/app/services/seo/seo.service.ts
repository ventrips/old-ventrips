import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  generateTags(config) {
    // default values
    config = {
      title: 'Welcome to Ventrips!',
      description: 'A one-stop shop for all your travel essentials',
      image: 'https://ventrips.com/favicon.ico',
      route: '',
      ...config
    };

    config.title = `Ventrips - ${config.title}`;
    config.description = config.description;

    // Set HTML Document Title
    this.title.setTitle(config.title);

    // twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@Ventrips' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    // facebook and other social sites
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Ventrips' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://ventrips.com/${config.route}` });
  }
}
