import { Component, EventEmitter, Input, Output, signal, OnChanges, SimpleChanges, inject, ChangeDetectorRef } from '@angular/core';
import { Trainee } from '../../../core/interfaces/trainee.interface';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-details',
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatIconModule, MatInputModule, MatButtonModule, MatDividerModule],
  standalone: true,
  templateUrl: './data-details.component.html',
  styleUrl: './data-details.component.scss'
})
export class DataDetailsComponent implements OnChanges {

  @Input() trainee: Trainee | null = null;
  @Input() form!: FormGroup;
  @Output() remove = new EventEmitter<number>();

  editable = signal<Trainee | null>(null);
  private cd = inject(ChangeDetectorRef);




  ngOnChanges(changes: SimpleChanges) {
    this.editable.set(this.trainee ? { ...this.trainee } : null);
    if (this.trainee) {
      this.form.setValue({
        id: this.trainee.id,
        name: this.trainee.name,
        subject: this.trainee.subject,
        grade: this.trainee.grade,
        date: this.trainee.date
      });
      // this.cd.detectChanges();
    } else {
      this.form.reset();
      // this.cd.detectChanges();
    }
  }


  clearForm() {
    this.form.reset();
  }

  onRemove() {
    if (this.trainee) {
      this.remove.emit(this.trainee.id);
      this.form.reset();
    }
  }
}
