import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Trainee } from '../../../core/interfaces/trainee.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, MatIconModule, MatTableModule, MatButtonModule],
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

  @Input() trainees: Trainee[] = [];
  @Output() selectedRow = new EventEmitter<Trainee>();
  @Output() pageIndex = new EventEmitter<number>();
  @Input() selectedTrainee!: Trainee | null;
  @Input() pageNum: number = 0;
  pageSize: number = 10;

  selectedId: number | null = null;

  structureTable: any[] = [
    { name: 'מספר מזהה', prop: 'id' },
    { name: 'שם', prop: 'name' },
    { name: 'תאריך', prop: 'date' },
    { name: 'ציון', prop: 'grade' },
    { name: 'מקצוע', prop: 'subject' }
  ];
  columnsToDisplay: string[] = this.structureTable.map(col => col.prop);


  ngOnInit() {
    console.log('DataTableComponent נוצר');
    console.log('selectedTrainee:', this.selectedTrainee);
    if (this.selectedTrainee) {
      this.selectedId = this.selectedTrainee.id;
    }
  }


  get currentPage() {
    const start = this.pageNum * this.pageSize;
    return this.trainees.slice(start, start + this.pageSize);
  }

  onNextPage() {
    if ((this.pageNum + 1) * this.pageSize < this.trainees.length) {
      this.pageNum++;
      this.pageIndex.emit(this.pageNum);
    }
  }

  onPreviousPage() {
    if (this.pageNum > 0) {
      this.pageNum--;
      this.pageIndex.emit(this.pageNum);
    }
  }

  selectRow(row: any) {
    this.selectedId = row.id;
    this.selectedRow.emit(row);
  }
}
