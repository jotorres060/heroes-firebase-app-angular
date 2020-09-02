import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from './../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  public heroe = new HeroeModel();

  constructor(
    private _heroes: HeroesService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this._heroes.getHeroe(id).subscribe((res: HeroeModel) => {
        this.heroe = res;
        this.heroe.id = id;
      });
    }
  }

  public guardar(frm: NgForm) {
    if (frm.invalid) {
      Object.values(frm.controls).forEach((ctrl) => {
        ctrl.markAsTouched();
      });
      return;
    }

    Swal.fire({
      title: 'Por favor espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this._heroes.editar(this.heroe);
    } else {
      peticion = this._heroes.crear(this.heroe);
    }

    peticion.subscribe((res) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente.',
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true
      }).then((res) => {
        if (res.isConfirmed) {
          this.router.navigateByUrl('/heroes');
        }
      });
    });
  }

}
