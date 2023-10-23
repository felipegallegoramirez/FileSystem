import { Component } from '@angular/core';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.css'],
  providers:[RolService]
})
export class AdmonComponent {

  constructor(private rolService:RolService){}

  agr:boolean=false;
  edit:boolean=false;
  act:string=""
  rols:Rol[]=[]

  ngOnInit() {
    this.gets();
  }

  change(a:boolean,b:string=""){
    this.agr=this.agr==true?false:true;
    this.edit=a
    this.act=a==true?b:"";
    setTimeout(()=> {
      var x =(<HTMLInputElement>document.getElementById("name"))
      if(x){
        x.value=this.rols.find((x)=>x._id==this.act)?.name||"";
      }
      if(a){
        this.get();
    }}
    , 50);
  }

  create(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var data = new Rol(name,[],"")


    this.rolService.postRol(data).subscribe(res=>{
      console.log(res)
      this.rolService.getRols().subscribe(res=>{
        this.rols=[]
        this.rols=res as Rol[];
        this.change(false);
      })
    })
  }
  gets(){
    this.rolService.getRols().subscribe(res=>{
      this.rols=[]
      this.rols=res as Rol[];
    })
  }
  delete(){
    this.rolService.deleteRol(this.act).subscribe(res=>{
      console.log(res)
      this.change(false);
      this.gets();
    })
  }

  put(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var data = new Rol(name,[],this.act)


    this.rolService.putRol(data,this.act).subscribe(res=>{
      console.log(res)
      this.rolService.getRols().subscribe(res=>{
        this.rols=[]
        this.rols=res as Rol[];
        this.change(false);
      })
    })



  }
  get(){
    let x =(<HTMLInputElement>document.getElementById("name"))
    x.value=this.rols.find((x)=>x._id==this.act)?.name||"";
  }
  
}
