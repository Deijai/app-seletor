import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from './../../services/paises.service';
import { Region } from './../../interfaces/interface';
import { switchMap, tap } from 'rxjs/operators';
import { Fronteira } from '../../interfaces/fronteira';

@Component({
  selector: 'app-seletor',
  templateUrl: './seletor.component.html',
  styleUrls: ['./seletor.component.css'],
})
export class SeletorComponent implements OnInit {
  form: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    fronteira: ['', [Validators.required]],
  });

  regions: string[] = [];
  paises: Region[] = [];
  fronteiras!: Fronteira | null;
  carregando: boolean = false;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regions = this.paisesService.getRegions;
    /*
    //Region
    this.form.get('region')?.valueChanges.subscribe((region) => {
      this.paisesService.getPaisesRegion(region).subscribe((paises) => {
        console.log(paises);

        this.paises = paises;
      });
    });
 */
    this.form
      .get('region')
      ?.valueChanges.pipe(
        tap(
          (_) => {
            this.form.get('pais')?.reset('');
            this.carregando = true;
          }
        ),
        switchMap((region) => this.paisesService.getPaisesRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.carregando = false;
      });

      this.form.get('pais')?.valueChanges.pipe(
        tap(
          (_) => {
            this.form.get('fronteira')?.reset('');
            this.carregando = true;
          }
        ),
        switchMap(code => this.paisesService.getFronteiraByCode( code ))
      ).subscribe( (fronteira) => {
        this.fronteiras = fronteira;
        this.carregando = false;
        console.log(fronteira);
      });
  }


  pesquisar() {
    console.log(this.form);
  }
}
