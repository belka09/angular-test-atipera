import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditElementDialogComponent } from './shared/components/edit-element-dialog/edit-element-dialog.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DataElement } from './shared/models/models';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    EditElementDialogComponent,
  ],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  dataSource: DataElement[] = [];
  filteredData: DataElement[] = [];
  filterValue: string = '';
  private filterSubject: Subject<string> = new Subject<string>();

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit() {
    this.loadData();

    this.filterSubject.pipe(debounceTime(2000)).subscribe((filterValue) => {
      this.applyFilterNow(filterValue);
    });
  }

  async loadData() {
    this.dataSource = await this.dataService.getElements();
    this.filteredData = [...this.dataSource];
  }

  applyFilter(value: string) {
    this.filterSubject.next(value);
  }

  applyFilterNow(filterValue: string) {
    const lowerCaseFilter = filterValue.toLowerCase();

    this.filteredData = this.dataSource.filter((element) =>
      Object.values(element).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseFilter)
      )
    );
  }

  editElement(element: DataElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '300px',
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateElement(result);
        this.dataSource = this.dataSource.map((el) =>
          el.position === result.position ? result : el
        );
        this.applyFilterNow(this.filterValue);
      }
    });
  }
}
