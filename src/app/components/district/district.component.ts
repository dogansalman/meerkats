import {Component, ViewEncapsulation, Input, ViewChild, Output, EventEmitter, Renderer2, OnInit} from '@angular/core';
import {HttpRequestService} from '../../services/httpRequest/httpRequest.service';
import {ControlContainer, FormGroupDirective} from '@angular/forms';
import {MatOptionSelectionChange, MatSelect} from '@angular/material';

@Component({
  selector: 'component-district',
  templateUrl: 'district.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})

export class DistrictComponent implements OnInit {

  districts: any[];
  public selectedDistrict;
  @Input() country_id: string;
  @Output() _loadEnd = new EventEmitter<any>();
  @Output() _selectedChange = new EventEmitter<any>();
  @ViewChild(MatSelect) select: MatSelect;
  _province_id: string;
  get province_id(): string {
    return this._province_id;
  }

  @Input('province_id')
  set province_id(value: string) {
    this._province_id = value;
    if (this.province_id) { this.updateDistrict(); return; }
    this.select.value = null;

  }

  @Input() _FormGroupName: string;
  @Input() _FormControlName: string;

  compareObjects(o1: any, o2: any): boolean {
    if (!o1 || !o2) { return; }
    return o1.name === o2.name && o1.id === o2.id;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.select._elementRef.nativeElement, 'loading');
    this.select.disabled = true;
  }

  constructor(private http: HttpRequestService, private renderer: Renderer2) {}

  public updateDistrict(): void {
    this.renderer.addClass(this.select._elementRef.nativeElement, 'loading');
    this.select.disabled = true;
    this.http.get('//geodata.solutions/api/api.php?type=getCities&countryId=' + this.country_id + '&stateId=' + this.province_id, {}).subscribe(data => {
      this.districts = [];
      Object.keys(data.result).forEach(key => {
        this.districts.push({id: key, name: data.result[key]});
      });
      this.districts.sort((a, b) => a.name.localeCompare(b.name));
      this._loadEnd.emit();
      this.renderer.removeClass(this.select._elementRef.nativeElement, 'loading');
      this.select.disabled = false;
    });
  }
  onSelectedDistrict(e: MatOptionSelectionChange): void {
    if (e.source.value !== this.selectedDistrict && this.selectedDistrict) {
      this._selectedChange.emit(e.source.value);
    }
    if (e.source.selected) {
      this.selectedDistrict = e.source.value;
    }
  }
}
