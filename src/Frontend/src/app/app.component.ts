import { Component } from '@angular/core';
import { OnChanges} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'fileSystem';
  loged=false;
  admonr:boolean=false;
  constructor(private router: Router,public authService:AuthService) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      
      if (event instanceof NavigationEnd) {
        this.authService.admon().subscribe(res=>{
          if(res.status=="admon"){
            this.admonr=true
          }
        })
        if(localStorage.getItem("token")){
          this.loged=true
          this.authService.checklogin().subscribe(res=>{
            if(res.status!="login"){
              this.salir()
            }
          })
        }else{
          this.loged=false
          if(event.url!="/aboutus" && event.url!="/login"){
            window.location.replace("http://localhost:4200/aboutus");
          }
        }
      }
    });
  }

  salir(){
    this.loged=false
    localStorage.removeItem("token")
    window.location.replace("http://localhost:4200/aboutus");
  }



}
