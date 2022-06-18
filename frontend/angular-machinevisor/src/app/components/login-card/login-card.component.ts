import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  myGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorLogin = false;

  signUpUser(email: string, password: string){
    const url = `${environment.apiUrl}/auth/sign_in`;
    const data = {
      "username": email,
      "password": password
    };
    console.log(data);
    //user: homerthebest
    //psw: admin
    this.http.post(url, data,
    { observe: 'response' }).subscribe(responce => {
      if(responce.status){
        console.log("SI");
      }else{
        console.log("NO");
      }
    });
  }


  onSubmit(){
    console.log("LOGIN");
    const user = this.myGroup.get('email')?.value;
    const psw = this.myGroup.get('password')?.value

    if(user !== '' &&  psw !== ''){
      const hashPsw = '' //hash della password

      ///this.signUpUser(this.myGroup.get('email')?.value, this.myGroup.get('password')?.value);

      //CONTROLLO FINTO PER FARE DELLE PROVE! <-- togliere
      if(user === "homer.simpson@gmail.com" && psw === "admin"){
        //salvo token o roba simile
        this.router.navigate(["/home"]);
      }else{
        this.errorLogin = true;
        //this.myGroup.get('email')?.patchValue(null);
        this.myGroup.get('password')?.patchValue(null);
      }
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

}
