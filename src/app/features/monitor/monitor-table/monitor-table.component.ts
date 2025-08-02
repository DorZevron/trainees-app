import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-monitor-table',
  imports: [CommonModule, MatTableModule],
  standalone: true,
  templateUrl: './monitor-table.component.html',
  styleUrl: './monitor-table.component.scss'
})
export class MonitorTableComponent {

  @Input() trainees: any[] = [];
  pageNum: number = 0;
  pageSize: number = 10;

  structureTable: any[] = [
    { name: 'מספר מזהה', prop: 'id' },
    { name: 'שם', prop: 'name' },
    { name: 'ממוצע', prop: 'average' },
    { name: 'מבחנים', prop: 'exams' },
  ];
  columnsToDisplay: string[] = this.structureTable.map(col => col.prop);


  get currentPage() {
    const start = this.pageNum * this.pageSize;
    return this.trainees.slice(start, start + this.pageSize);
  }

}
