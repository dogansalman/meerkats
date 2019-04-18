import {Component, ViewEncapsulation, Input, ViewChild} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {ControlContainer, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-district',
  templateUrl: 'district.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})

export class DistrictComponent {

  districts: any[];
  @Input() country_id: string;
  @ViewChild('districtSelection') districtSelection;

  _province_id: string;
  get province_id(): string {
    return this._province_id;
  }

  @Input('province_id')
  set province_id(value: string) {
    this._province_id = value;
    if (this.province_id) { this.updateDistrict(); return; }
    this.districtSelection.value = null;

  }

  @Input() _FormGroupName: string;
  @Input() _FormControlName: string;

  compareObjects(o1: any, o2: any): boolean {
    if (!o1 || !o2) { return; }
    return o1.name === o2.name && o1.id === o2.id;
  }

  constructor(private http: HttpRequestService) {}

  public updateDistrict(): void {
    this.http.get('http://geodata.solutions/api/api.php?type=getCities&countryId=' + this.country_id + '&stateId=' + this.province_id, {}).subscribe(data => {
      this.districts = [];
      Object.keys(data.result).forEach(key => {
        this.districts.push({id: key, name: data.result[key]});
      });
      this.districts.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
