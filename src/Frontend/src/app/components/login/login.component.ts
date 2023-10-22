import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})


export class LoginComponent {
  constructor(public authService:AuthService){}
  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // @ts-ignore: Object is possibly 'null'
    signInButton.addEventListener('click', () => {
      // @ts-ignore: Object is possibly 'null'
      container.classList.remove("right-panel-active");
    });

  }
  id:string=""
  login(){
    var email = (<HTMLInputElement>document.getElementById("email1")).value;
    var password = (<HTMLInputElement>document.getElementById("password1")).value;
    var data={
      email:email,
      password:password
    } 
    console.log(data)
    this.authService.postAuth(data).subscribe((res)=>{
      alert(res)
      // @ts-ignore: Object is possibly 'null'
      container.classList.add("right-panel-active");
      this.id=res._id
    },(error)=>{
      console.log(error)
    })

  }

  code(){
    var id = this.id
    var data = {
      code: (<HTMLInputElement>document.getElementById("code1")).value
    }
    
    console.log(data)
    this.authService.postAuthCode(data,id).subscribe(res=>{
        console.log(res)
        var x = res.token
        localStorage.setItem('token',x);
        window.location.replace("http://localhost:4200/intranet");
    })
  }


}
