import { Injectable } from '@angular/core';
import { DataElement } from '../../shared/models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private ELEMENT_DATA: DataElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  constructor() {}

  getElements(): Promise<DataElement[]> {
    return new Promise((resolve) => {
      resolve([...this.ELEMENT_DATA]);
    });
  }

  updateElement(updatedElement: DataElement): void {
    this.ELEMENT_DATA = this.ELEMENT_DATA.map((element) =>
      element.position === updatedElement.position
        ? { ...updatedElement }
        : element
    );
  }
}
