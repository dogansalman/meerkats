import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {MatOptionSelectionChange} from '@angular/material';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-province',
  templateUrl: 'province.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})

export class ProvinceComponent {

  provinces: any[];
  public selectedProvince;

  @Output() _provinces = new EventEmitter<any[]>();

  constructor(private http: HttpRequestService) {
    this.http.get('http://geodata.solutions/api/api.php?type=getStates&countryId=TR', {}).subscribe(data => {
      this.provinces = [];
      Object.keys(data.result).forEach(key => {
        this.provinces.push({id: key, name: data.result[key]});
      });
      this.provinces.sort((a, b) => a.name.localeCompare(b.name));
      this._provinces.emit(this.provinces);
    });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
  onSelectedProvince(e: MatOptionSelectionChange): void {
    if (!e.source.selected) { return; }
    this.selectedProvince = e.source.value;
  }
}
