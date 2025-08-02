import { Component, inject } from '@angular/core';
import { MonitorTableComponent } from "../monitor-table/monitor-table.component";
import * as MonitorSelectors from '../../../core/state/monitor.selectors';
import * as MonitorActions from '../../../core/state/monitor.actions';
import * as selectTrainees from '../../../core/state/data.selectors';
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

  $trainees: Observable<Trainee[]> = this.store.select(selectTrainees.selectTrainees);
  $cbPassed: Observable<boolean> = this.store.select(MonitorSelectors.selectCbPassed);
  $cbFailed: Observable<boolean> = this.store.select(MonitorSelectors.selectCbFailed);
  $traineesFiltered: Observable<TraineeMonitor[]> = this.store.select(MonitorSelectors.selectTraineesFiltered);

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

        // this.formCheckBox.get('passed')?.setValue(cbPassed);
      }
    });

    this.$cbFailed.subscribe(cbFailed => {
      if (cbFailed !== undefined) {
        this.formCheckBox.patchValue({ failed: cbFailed });
        // this.formCheckBox.get('failed')?.setValue(cbFailed);
      }
    });

    this.$traineesFiltered.subscribe(traineesFiltered => {
      if (traineesFiltered.length !== 0) {
        this.traineesFiltered = traineesFiltered;
      } else {
        this.getNewTraineeAverages();
      }
    });

  }


  ngOnDestroy(): void {
    // console.log('MonitorPageComponent נהרס');
    this.store.dispatch(MonitorActions.setPassedFilter({ cbPassed: this.formCheckBox.get('passed')?.value }));
    this.store.dispatch(MonitorActions.setFailedFilter({ cbFailed: this.formCheckBox.get('failed')?.value }));
    this.store.dispatch(MonitorActions.setTraineesFiltered({ traineesFiltered: this.traineesFiltered }));
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
      arr = arr.filter(trainee => trainee.name.includes(this.nameFilter));
    }

    if (this.formCheckBox.get('passed')?.value) {
      let passedArr = arr.filter(trainee => trainee.average >= 65);
      this.traineesFiltered.push(...passedArr);
    }
    if (this.formCheckBox.get('failed')?.value) {
      let failedArr = arr.filter(trainee => trainee.average < 65);
      this.traineesFiltered.push(...failedArr);
    }
  }

  onCbPassed(value: boolean) {
    this.formCheckBox.get('passed')?.setValue(value);
    this.getNewTraineeAverages();
  }

  onCbFailed(value: boolean) {
    this.formCheckBox.get('failed')?.setValue(value);
    this.getNewTraineeAverages();
  }
}
