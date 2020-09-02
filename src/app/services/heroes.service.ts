import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { HeroeModel } from './../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url: string = 'https://heroes-firebase-app.firebaseio.com';

  constructor(private http: HttpClient) { }

  public getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map((res: any) => this.crearArray(res))
      );
  }

  public getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  public crear(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((res: any) => {
          heroe.id = res.name;
          return heroe;
        })
      );
  }

  public editar(heroe: HeroeModel) {
    const heroeTmp = {
      ...heroe
    };

    delete heroeTmp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTmp);
  }

  public eliminar(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArray(heroesObj: Object) {
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }

}
