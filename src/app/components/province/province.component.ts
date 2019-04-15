import {Component, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {MatOptionSelectionChange} from '@angular/material';

@Component({
  selector: 'app-province',
  templateUrl: 'province.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ProvinceComponent {

  provinces: any[];
  public selectedProvince;

  @Output() _provinces = new EventEmitter<any[]>();


  // TODO On selection changed do not fire. updateDistricts function in districtComponents
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
  onSelectedProvince(e: MatOptionSelectionChange): void {
    console.log(e);
    if (!e.source._selected) { return; }
    this.selectedProvince = e.source.value;
  }
}
