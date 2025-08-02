import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { Trainee } from '../../../core/interfaces/trainee.interface';
import { DataService } from '../../../core/services/data.service';
import { DataFilterComponent } from "../data-filter/data-filter.component";
import { DataTableComponent } from "../data-table/data-table.component";
import { DataDetailsComponent } from "../data-details/data-details.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as DataSelectors from '../../../core/state/data.selectors';
import * as DataActions from '../../../core/state/data.actions';


@Component({
  selector: 'app-data-page',
  imports: [CommonModule, DataFilterComponent, DataTableComponent, DataDetailsComponent],
  standalone: true,
  templateUrl: './data-page.component.html',
  styleUrl: './data-page.component.scss'
})
export class DataPageComponent implements OnDestroy {

  private store = inject(Store);
  private dataService = inject(DataService);
  $trainees: Observable<Trainee[]> = this.store.select(DataSelectors.selectTrainees);
  $traineesFiltered: Observable<Trainee[]> = this.store.select(DataSelectors.selectTraineesFiltered);
  $selected: Observable<Trainee | null> = this.store.select(DataSelectors.selectSelectedTrainee);
  $filter: Observable<string> = this.store.select(DataSelectors.selectFilter);
  $pageIndex: Observable<number> = this.store.select(DataSelectors.selectPageIndex);

  trainees: Trainee[] = [];
  traineesFiltered: Trainee[] = [];
  selected: Trainee | null = null;
  filtertxt: string = '';
  errorMessage: string = '';
  pageNum: number = 0;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log('DataDetailsComponent נוצר');

    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      grade: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      date: ['', Validators.required]
    });
  }




  ngOnInit() {

    this.$trainees.subscribe(trainees => {
      if (trainees.length !== 0) {
        this.trainees = trainees;
        this.filter();
      }
    });

    this.$traineesFiltered.subscribe(filtered => {
      if (filtered.length === 0)
        this.traineesFiltered = this.trainees;
      else
        this.traineesFiltered = filtered;
    });

    this.$selected.subscribe(selected => {
      this.selected = selected;
      if (this.selected) {
        this.form.patchValue(this.selected);
      } else {
        this.form.reset();
      }
    });

    this.$filter.subscribe(filter => {
      this.filtertxt = filter;
    });

    this.$pageIndex.subscribe(pageIndex => {
      this.pageNum = pageIndex;
    });

  }

  ngOnDestroy(): void {
    this.store.dispatch(DataActions.setFilter({ filter: this.filtertxt }));
    this.store.dispatch(DataActions.setTraineesFiltered({ traineesFiltered: this.traineesFiltered }));
    this.store.dispatch(DataActions.setTrainees({ trainees: this.trainees }));
    this.store.dispatch(DataActions.setPageIndex({ pageIndex: this.pageNum }));
  }

  filter() {
    this.errorMessage = '';
    let arr = this.trainees;
    const txt = this.filtertxt.trim().toLowerCase();

    if (txt) {
      if (txt.startsWith('id:')) {
        // const id = parseInt(txt.split(':')[1], 10);
        const id = Number(txt.substring(3));
        arr = arr.filter(t => t.id === id)
      } else if (txt.startsWith('>') || txt.startsWith('<')) {
        const val = txt.substring(1);
        const dateRegex = /^(\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})$/;

        if (dateRegex.test(val)) {
          if (txt.startsWith('>'))
            arr = arr.filter(t => t.date > val);
          else
            arr = arr.filter(t => t.date < val);
        } else if (!isNaN(Number(val))) {
          const gradValue = Number(val);
          if (txt.startsWith('>'))
            arr = arr.filter(t => t.grade > gradValue);
          else
            arr = arr.filter(t => t.grade < gradValue);
        }
      }
      else {
        this.errorMessage = 'Invalid filter format. Use "ID:123", ">90", "<2024-01-01", or "02-02-2024"';
      }
    }
    this.traineesFiltered = arr;
  }

  onFilter(txt: string) {
    this.filtertxt = txt;
    this.filter();
  }

  onSelect(trainee: Trainee) {
    this.selected = { ...trainee };
    this.form.patchValue(trainee);
    console.log('קומפוננטה אב נבחר מתאמן:', this.selected);
    this.store.dispatch(DataActions.selectTraineeRow({ selectedRow: this.selected }));
  }

  onPageIndex(pageIndex: number) {
    this.pageNum = pageIndex;
    console.log('onPageIndex:', this.pageNum);
  }

  onAddOrUpdate(trainee: Trainee) {
    if (trainee.id) {
      this.trainees = this.dataService.updateTrainee(trainee);
      // this.store.dispatch(DataActions.updateTrainee({ trainee })); // I'm passing the array after changes to ngOnDestroy
    }
    else {
      this.trainees = this.dataService.addTrainee(trainee);
      // this.store.dispatch(DataActions.addTrainee({ trainee })); // I'm passing the array after changes to ngOnDestroy
    }
  }


  onRemove(id: number) {
    this.trainees = this.dataService.deleteTrainee(id);
    this.filter();
    if (this.selected && this.selected.id === id)
      this.selected = null;
    // this.store.dispatch(DataActions.deleteTrainee({ id })); // I'm passing the array after changes to ngOnDestroy
  }
}
