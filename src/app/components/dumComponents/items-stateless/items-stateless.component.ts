import { Component, OnInit, Input,Output, EventEmitter, Inject  } from '@angular/core';
import { PriceQuantitylogicService } from '../../../services/priceQuantitylogic/price-quantitylogic.service';
import { DOCUMENT } from '@angular/common';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-items-stateless',
  templateUrl: './items-stateless.component.html',
  styleUrls: ['./items-stateless.component.css']
})
export class ItemsStatelessComponent implements OnInit {
  registerForm: FormGroup;
  itemName:any;
@Input() items:any;
@Input() dataValidation:boolean;
@Output() itemEmmited = new EventEmitter<any> ();
@Input() error:string;
  id: any;
  UpdatedPrice: any=[];
  constructor(private Businesslogic:PriceQuantitylogicService, @Inject(DOCUMENT) private _document: Document,private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      search: ['', Validators.required],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
      const userEntered = this.itemName.trim().toLowerCase();
      this.itemEmmited.emit(userEntered);
  }

  increase(id) {
   return this.Businesslogic.increase(id,this.items);  
  }
  decrease(id){
   return this.Businesslogic.decrease(id,this.items)
  }
  totalCost(){
    return this.Businesslogic.totalCost();
  }
  totalQuantities(){
    return this.Businesslogic.totalQuantities();
  }
  alertShow(){
    alert(`Your Total Price is ${this.totalCost()} and Your Transaction is successful .`);
    this._document.defaultView.location.reload();
  }
}





