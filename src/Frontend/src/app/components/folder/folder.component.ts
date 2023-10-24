import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { Folder } from 'src/app/models/folder';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {

  constructor(private folderService:FolderService,private rolService:RolService,private userService:UserService){}

  agr:boolean=false;
  agr2:boolean=false;
  edit:boolean=false;
  act:string=""
  folders:Folder[]=[]

  rols:Rol[]=[]
  users:User[]=[]
  arols:Array<Rol> =[]
  ausers:Array<User> =[]

  ngOnInit() {
    this.gets();
    this.rolService.getRols().subscribe(res=>{
      this.rols=res as Rol[]
    })
    this.userService.getUsers().subscribe(res=>{
      this.users=res as User[]
    })
  }

  change(a:boolean,b:string=""){
    this.agr=this.agr==true?false:true;
    this.agr2=false
    this.edit=a
    this.act=a==true?b:"";
    setTimeout(()=> {
      var x =(<HTMLInputElement>document.getElementById("name"))
      if(x){
        x.value=this.folders.find((x)=>x._id==this.act)?.name||"";
      }
      if(a){
        this.get();
    }}
    , 50);
  }

  create1(){
    this.agr2=true
  }

  create(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var data = new Folder()


    this.folderService.postFolder(data).subscribe(res=>{
      console.log(res)
      this.folderService.getFolders().subscribe(res=>{
        this.folders=[]
        this.folders=res as Folder[];
        this.change(false);
      })
    })
  }
  gets(){
    this.folderService.getFolders().subscribe(res=>{
      this.folders=[]
      this.folders=res as Folder[];
    })
  }
  delete(){
    this.folderService.deleteFolder(this.act).subscribe(res=>{
      console.log(res)
      this.change(false);
      this.gets();
    })
  }

  put(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var data = new Folder()


    this.folderService.putFolder(data,this.act).subscribe(res=>{
      console.log(res)
      this.folderService.getFolders().subscribe(res=>{
        this.folders=[]
        this.folders=res as Folder[];
        this.change(false);
      })
    })



  }
  get(){
    let x =(<HTMLInputElement>document.getElementById("name"))
    x.value=this.folders.find((x)=>x._id==this.act)?.name||"";
  }



  addrol(){
    let rol = (<HTMLInputElement>document.getElementById("rol")).value||"";
    if(this.arols.findIndex((x)=>x._id==rol)==-1){
      var r=this.rols.find((x)=>x._id==rol)
      if(r){
        this.arols.push(r)
      }
    }
  }

  adduser(){
    let user = (<HTMLInputElement>document.getElementById("user")).value||"";

    if(this.ausers.findIndex((x)=>x._id==user)==-1){
      let u=this.users.find((x)=>x._id==user)
      if(u){
        this.ausers.push(u)
      }
    }


  }

  removerol(rol:string){
    let r=this.rols.findIndex((x)=>{x._id==rol})
    if(r){
      this.arols.splice(r,1)
    }
  }

  removeuser(user:string){
    let u=this.ausers.findIndex((x)=>{x._id==user})
    if(u){
      this.ausers.splice(u-1,1)
    }
  }

}
