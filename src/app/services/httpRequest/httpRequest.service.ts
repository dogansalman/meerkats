import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()

export class HttpRequestService {

  datas;
  private header = {
    'Content-Type': 'application/json'
  };

  constructor(private client: HttpClient) {}

  public get(url: string, option: any): Observable<any> {
     return this.client.get(url, Object.assign(this.header, option));
  }
}
