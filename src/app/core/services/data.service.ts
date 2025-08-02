import { Injectable } from '@angular/core';
import { Trainee } from '../interfaces/trainee.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private trainees: Trainee[] = [
    { id: 1, name: 'John Doe', subject: 'Mathematics', grade: 85, date: '2023-10-01' },
    { id: 2, name: 'John Doe', subject: 'Mathematics', grade: 75, date: '2023-11-02' },
    { id: 3, name: 'John Doe', subject: 'Mathematics', grade: 60, date: '2023-12-02' },
    { id: 4, name: 'Fiona Black', subject: 'Biology', grade: 70, date: '2023-12-08' },
    { id: 5, name: 'Fiona Black', subject: 'Biology', grade: 90, date: '2023-11-08' },
    { id: 6, name: 'Diana Green', subject: 'Physics', grade: 50, date: '2023-10-06' },
    { id: 7, name: 'Diana Green', subject: 'Physics', grade: 60, date: '2023-11-06' },
    { id: 8, name: 'Diana Green', subject: 'Physics', grade: 55, date: '2023-12-06' },
    { id: 9, name: 'George Yellow', subject: 'Geography', grade: 82, date: '2023-10-09' },
    { id: 10, name: 'Hannah Purple', subject: 'Computer Science', grade: 91, date: '2023-10-10' },
    { id: 11, name: 'Ian Orange', subject: 'Economics', grade: 89, date: '2023-10-11' },
    { id: 12, name: 'Julia Pink', subject: 'Philosophy', grade: 84, date: '2023-10-12' },
    { id: 13, name: 'Kevin Grey', subject: 'Psychology', grade: 86, date: '2023-10-13' },
    { id: 14, name: 'Laura Cyan', subject: 'Sociology', grade: 83, date: '2023-10-14' },
    { id: 15, name: 'Mike Teal', subject: 'Political Science', grade: 88, date: '2023-10-15' },
  ];
  filter: string = '';
  pageIndex: number = 0;
  selectedId: number | null = null;


  getTrainees(): Observable<Trainee[]> {
    return new Observable<Trainee[]>(observer => {
      observer.next(this.trainees);
      observer.complete();
    });
  }

  addTrainee(trainee: Trainee): Trainee[] {
    this.trainees.push({ ...trainee, id: this.trainees.length + 1 });
    return this.trainees;
  }

  updateTrainee(updatedTrainee: Trainee) {
    const index = this.trainees.findIndex(t => t.id === updatedTrainee.id);
    if (index !== -1) {
      this.trainees[index] = updatedTrainee;
    }
    return this.trainees;
  }

  deleteTrainee(id: number) {
    this.trainees = this.trainees.filter(t => t.id !== id);
    return this.trainees;
  }
}