import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(private fomrBuilder : FormBuilder, private _http : HttpClient, private router : Router) { }
  ngOnInit(): void {
    this.loginForm = this.fomrBuilder.group({
      email : [''],
      password : ['']
    })
  }
  // Creating a Method for Login
  login(){
      this._http.get<any>("http://localhost:3000/signup").subscribe(res =>{
         const user = res.find((data : any) =>{
           return data.email === this.loginForm.value.email && data.password === this.loginForm.value.password
         })
         if(user){
           alert("Login Successfully...");
           this.loginForm.reset();
           this.router.navigate(['restaurant'])
         }else{
           alert("User not found...");
         }
      },err =>{
        alert("Something went wrong from server side  bro...")
      })
  }

}
