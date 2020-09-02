import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { HeroesService } from './../../services/heroes.service';
import { HeroeModel } from './../../models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: HeroeModel[];
  public loading: boolean = false;

  constructor(private _heroes: HeroesService) { }

  ngOnInit(): void {
    this.loading = true;
    this._heroes.getHeroes().subscribe((res) => {
      this.heroes = res;
      this.loading = false;
    });
  }

  public eliminar(heroe: HeroeModel, index: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Se eliminará el héroe ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then((res) => {
      if (res.isConfirmed) {
        this._heroes.eliminar(heroe.id).subscribe((res) => {
          this.heroes.splice(index, 1);
        });
      }
    });
  }

}
