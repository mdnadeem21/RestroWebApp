import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue !: FormGroup
  restaurentModelObj: RestaurantData = new RestaurantData
  allRestaurantData: any;
  showAdd !: boolean;
  showBtn !: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService,
              ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })

    this.getAllData();

  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
  //Now Subscribing our data which is mapped via Services...
  addResto() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Record Added!");

      //clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    },
      err => {
        alert("Something went wrong " + err);
      }
    )
  }

  getAllData(){
    this.api.getRestaurant().subscribe(res =>{
      this.allRestaurantData = res;
    })
  }

  //delete records
  deleteRecords(data :any){
    this.api.deleteReastaurant(data.id).subscribe(res =>{
      alert("Record deleted!");
      this.getAllData();
    })
  }

  onEditResto(data : any){

    this.showAdd = false;
    this.showBtn = true;
    this.restaurentModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
   
  }

  updateResto(){
  //  console.log('Update button clicked!');
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res =>{

      alert("Restaurant Records Update!");

       //clear fill form data
       let ref = document.getElementById('clear');
       ref?.click();
       this.formValue.reset();
       this.getAllData();
        
    })
  }
}
