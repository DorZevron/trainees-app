import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataPageComponent } from "./features/data/data-page/data-page.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { DataService } from './core/services/data.service';
import { Trainee } from './core/interfaces/trainee.interface';
import { Store } from '@ngrx/store';
import * as DataActions from './core/state/data.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private dataService = inject(DataService);
  private store = inject(Store);



  ngOnInit(): void {
    this.dataService.getTrainees().subscribe(trainee => {
      let traineesArr = trainee
      this.store.dispatch(DataActions.setTrainees({ trainees: traineesArr }));
    });
    this.store.dispatch(DataActions.loadTrainees());
  }


}
