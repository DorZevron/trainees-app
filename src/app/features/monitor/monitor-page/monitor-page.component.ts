import { Component, inject } from '@angular/core';
import { MonitorTableComponent } from "../monitor-table/monitor-table.component";
import * as MonitorSelectors from '../../../core/state/monitor.selectors';
import * as MonitorActions from '../../../core/state/monitor.actions';
import * as DataSelectors from '../../../core/state/data.selectors';
import { Store } from '@ngrx/store';
import { Trainee } from '../../../core/interfaces/trainee.interface';
import { Observable } from 'rxjs';
import { MonitorFilterComponent } from "../monitor-filter/monitor-filter.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { TraineeMonitor } from '../../../core/interfaces/traineeMonitor.interface';



@Component({
  selector: 'app-monitor-page',
  imports: [MonitorTableComponent, MonitorFilterComponent],
  standalone: true,
  templateUrl: './monitor-page.component.html',
  styleUrl: './monitor-page.component.scss'
})
export class MonitorPageComponent {

  private store = inject(Store);

  $trainees: Observable<Trainee[]> = this.store.select(DataSelectors.selectTrainees);
  $cbPassed: Observable<boolean> = this.store.select(MonitorSelectors.selectCbPassed);
  $cbFailed: Observable<boolean> = this.store.select(MonitorSelectors.selectCbFailed);
  $traineesFilteredMonitor: Observable<TraineeMonitor[]> = this.store.select(MonitorSelectors.selectTraineesFiltered);
  $idFilter: Observable<string> = this.store.select(MonitorSelectors.selectIdFilter);
  $nameFilter: Observable<string> = this.store.select(MonitorSelectors.selectNameFilter);

  trainees: Trainee[] = [];
  idFilter: string = '';
  nameFilter: string = '';
  formCheckBox: FormGroup;
  newStructureTrainees: TraineeMonitor[] = [];
  traineesFiltered: TraineeMonitor[] = [];


  constructor(private fb: FormBuilder) {
    this.formCheckBox = this.fb.group({
      passed: [true],
      failed: [true]
    });
  }

  ngOnInit(): void {
    console.log('MonitorPageComponent נוצר');

    this.$trainees.subscribe(trainees => {
      if (trainees.length !== 0) {
        this.trainees = trainees;
        this.getNewTraineeAverages();
      }
    });


    this.$cbPassed.subscribe(cbPassed => {
      if (cbPassed !== undefined) {
        this.formCheckBox.patchValue({ passed: cbPassed });
      }
    });

    this.$cbFailed.subscribe(cbFailed => {
      if (cbFailed !== undefined) {
        this.formCheckBox.patchValue({ failed: cbFailed });
      }
    });

    this.$traineesFilteredMonitor.subscribe(traineesFiltered => {
      if (traineesFiltered.length !== 0) {
        this.traineesFiltered = traineesFiltered;
      } else {
        this.getNewTraineeAverages();
      }
    });

    this.$idFilter.subscribe(idFilter => {
      if (idFilter !== undefined) {
        this.idFilter = idFilter;
      }
    });

    this.$nameFilter.subscribe(nameFilter => {
      if (nameFilter !== undefined) {
        this.nameFilter = nameFilter;
      }
    });

  }


  ngOnDestroy(): void {
    // console.log('MonitorPageComponent נהרס');
    this.store.dispatch(MonitorActions.setPassedFilter({ cbPassed: this.formCheckBox.get('passed')?.value }));
    this.store.dispatch(MonitorActions.setFailedFilter({ cbFailed: this.formCheckBox.get('failed')?.value }));
    this.store.dispatch(MonitorActions.setTraineesFiltered({ traineesFiltered: this.traineesFiltered }));
    this.store.dispatch(MonitorActions.setIdFilter({ idFilter: this.idFilter }));
    this.store.dispatch(MonitorActions.setNameFilter({ nameFilter: this.nameFilter }));
  }


  getNewTraineeAverages() {
    const grouped = new Map<string, { id: number, name: string, subject: string, average: number, exams: number, sum: number }>();
    this.trainees.forEach(trainee => {
      const key = `${trainee.name}|| ${trainee.subject}`;
      if (!grouped.has(key)) {
        grouped.set(key, { id: trainee.id, name: trainee.name, subject: trainee.subject, average: 0, exams: 0, sum: 0 });
      }
      const entry = grouped.get(key)!;
      entry.sum += trainee.grade;
      entry.exams += 1;
    });

    const result: TraineeMonitor[] = [];
    grouped.forEach(obj => {
      result.push({
        id: obj.id,
        name: obj.name,
        subject: obj.subject,
        average: parseFloat((obj.sum / obj.exams).toFixed(2)),
        exams: obj.exams
      });
    })
    this.newStructureTrainees = result;
    this.filter();
  }


  filter() {
    this.traineesFiltered = [];
    let arr: TraineeMonitor[] = [...this.newStructureTrainees];

    if (this.idFilter) {
      arr = arr.filter(trainee => trainee.id.toString().includes(this.idFilter));
    }

    if (this.nameFilter) {
      arr = arr.filter(trainee => trainee.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
    }

    const passedChecked = this.formCheckBox.get('passed')?.value;
    const failedChecked = this.formCheckBox.get('failed')?.value;

    if (passedChecked && !failedChecked) {
      arr = arr.filter(trainee => trainee.average >= 65);
    }
    else if (!passedChecked && failedChecked) {
      arr = arr.filter(trainee => trainee.average < 65);
    }
    else if (!passedChecked && !failedChecked) {
      arr = [];
    }

    this.traineesFiltered = arr;
  }


  onCbPassed(value: boolean) {
    this.formCheckBox.get('passed')?.setValue(value);
    this.filter();

  }

  onCbFailed(value: boolean) {
    this.formCheckBox.get('failed')?.setValue(value);
    this.filter();

  }

  onIdFilterChanged(value: string) {
    this.idFilter = value;
    this.filter();
  }

  onNameFilterChanged(value: string) {
    this.nameFilter = value;
    this.filter();
  }
}
