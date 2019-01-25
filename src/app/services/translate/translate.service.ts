import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TranslateService {
  data: any = {};
  constructor(private http: HttpClient) { }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resole, reject) => {
      const langPath = `assets/i18n/${lang || 'tr'}.json`;

      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          return resole(this.data);
        },
        error => {
          this.data = {};
          return reject();
        }
      );
    });
  }
}
