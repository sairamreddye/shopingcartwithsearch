import { Component, OnInit } from '@angular/core';
import { ItemsDataService } from '../../../services/itemsData/items-data.service';
import { catchError,map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { of } from 'rxjs';
import data from '../../../data/shoping.json';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-items-state',
  templateUrl: './items-state.component.html',
  styleUrls: ['./items-state.component.css']
})
export class ItemsStateComponent implements OnInit {
  items: any[];
  marvelHeroes: any = [];
  isItemExist = true;
  error: string;
  private _jsonURL = '../../../data/shoping.json';
  frozenObject: readonly any[];
  constructor(private itemsData:ItemsDataService,private http: HttpClient) {
    this.getJSON().subscribe(data => {
      console.log(data),
      ((err) => {
        console.log(err = this.error = 'reteriving data failed try again')
      })
     });
   }

   public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
 
  ngOnInit() {
  this.items = data;
  this.frozenObject = Object.freeze(this.items);
  }

  searchItem(itemName){
    if(itemName === "" || itemName === undefined){
      this.isItemExist =true;
      this.items = [...this.frozenObject];
    }
    else if(itemName != ''){
      this.items = [...this.frozenObject];
          this.marvelHeroes = this.items.filter((hero) => {
            return hero.Brandname == itemName;
          });
          if(this.marvelHeroes.length > 0){
            this.isItemExist =true;
            this.items = [...this.marvelHeroes];
          }
            else if(this.marvelHeroes.length <= 0){
              this.isItemExist =false;
              this.error = 'NO ITEM AVAILABLE WITH SEARCHED NAME SEARCH FOR ANOTHER ITEM';
              // this.items = [...this.frozenObject]; //whole data to render incase of name will not match to avoid error message
              console.log(this.isItemExist);
            }
        }
  }
}




//this.logic is used for promise based external service call you can uncomment and checkit
//data will get from external api now i am using local json file to host the app in github pages

  //   this.itemsData.getItems().pipe(
  //     map((res:any []) => this.items = res),
  //     catchError(err => {
  //         console.log('caught mapping error and rethrowing', err);
  //         return throwError(err);
  //     }),
  //     catchError(err => {
  //         console.log('caught rethrown error, providing fallback value',err);
  //         return of([]);
  //     })
  // )
  // .subscribe(
  //     res => console.log('HTTP response',res),
  //     err => console.log('HTTP Error', err),
  //     () => console.log('HTTP request completed.')
  // );

  //ends-here