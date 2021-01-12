import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(public http: HttpClient) { }

  public getJSON(name: string): Observable<any> {
    return this.http.get('assets/brackets/' + name + '.json')
  }
}
