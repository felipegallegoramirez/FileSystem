import { Component } from '@angular/core';
import { OnChanges} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'fileSystem';
  loged=true;
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(localStorage.getItem("token")!=undefined||localStorage.getItem!=null){
          this.loged=true
        }
      }
    });
  }

  salir(){
    this.loged=false
    localStorage.removeItem("token")
  }



}
