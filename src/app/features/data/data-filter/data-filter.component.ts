import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Trainee } from '../../../core/interfaces/trainee.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './data-filter.component.html',
  styleUrl: './data-filter.component.scss'
})
export class DataFilterComponent {

  // private store = inject(Store);
  @Input() trainee: Trainee | null = null;
  @Input() form!: FormGroup;
  @Output() filterChanged = new EventEmitter<string>();
  @Output() addNewOne = new EventEmitter<Trainee>();
  @Input() filter: string = '';


  onChange() {
    this.filterChanged.emit(this.filter);
  }

  onAddorUpdate() {
    if (this.form.valid) {
      this.addNewOne.emit(this.form.value);
    }
  }

}
