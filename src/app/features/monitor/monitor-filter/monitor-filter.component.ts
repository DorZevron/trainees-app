import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-monitor-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './monitor-filter.component.html',
  styleUrl: './monitor-filter.component.scss'
})
export class MonitorFilterComponent {

  @Input() idFilter: string = '';
  @Input() formCheckBox!: FormGroup;
  @Input() nameFilter: string = '';
  @Output() cbPassed = new EventEmitter<boolean>();
  @Output() cbFailed = new EventEmitter<boolean>();



  ngOnInit(): void {
    console.log('MonitorFilterComponent נוצר');
  }

  ngOnDestroy(): void {
    console.log('MonitorFilterComponent נהרס');
  }


  onPassedChange() {
    this.cbPassed.emit(this.formCheckBox.get('passed')?.value);
  }

  onFailedChange() {
    this.cbFailed.emit(this.formCheckBox.get('failed')?.value);
  }

}
