import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { Folder } from 'src/app/models/folder';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ImageService } from 'src/app/services/image.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.css'],
  providers:[RolService]
})
export class AdmonComponent {

  constructor(private folderService:FolderService,private rolService:RolService,private userService:UserService, private imageService:ImageService, private authService:AuthService){}

  agr:boolean=false;
  edit:boolean=false;
  act:string=""
  rols:Rol[]=[]

  //!pt2
  pt:boolean=true;


  ngOnInit() {
    this.authService.admon().subscribe(res=>{
      if(res.status!="admon"){
        window.location.replace("http://localhost:4200/folders");
      }
    })
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
    
    if(name.length<3){
      alert("Rellena los campos")
    }
    else{
      this.rolService.postRol(data).subscribe(res=>{
        console.log(res)
        this.rolService.getRols().subscribe(res=>{
          this.rols=[]
          this.rols=res as Rol[];
          this.change(false);
        })
      })
    }


  }
  gets(){
    this.rolService.getRols().subscribe(res=>{
      this.rols=[]
      this.rols=res as Rol[];
    })
    this.userService.getUsers().subscribe(res=>{
      this.users=res as User[]
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

    if(name.length<3){
      alert("Rellena los campos")
    }
    else{
    this.rolService.putRol(data,this.act).subscribe(res=>{
      console.log(res)
      this.rolService.getRols().subscribe(res=>{
        this.rols=[]
        this.rols=res as Rol[];
        this.change(false);
      })
    })
  }
  }
  get(){
    let x =(<HTMLInputElement>document.getElementById("name"))
    x.value=this.rols.find((x)=>x._id==this.act)?.name||"";
  }



//!-------------


  id:string=localStorage.getItem("id")||""
  uagr:boolean=false;
  uagr2:boolean=false;
  uedit:boolean=false;
  uact:string=""
  uafolders:Folder[]=[]
  ufolders:Folder[]=[]

  urols:Rol[]=[]
  users:User[]=[]
  arols:Array<Rol> =[]
  ausers:Array<User> =[]


  uchange(a:boolean,b:string=""){
    this.uagr=this.uagr==true?false:true;
    this.uedit=a
    this.uact=a==true?b:"";
    this.arols=[]
    setTimeout(()=> {
      var x =(<HTMLInputElement>document.getElementById("uname"))
      if(x){
        x.value=this.users.find((x)=>x._id==this.uact)?.name||"";
      }
      if(a){
        let x=this.users.find((x)=>x._id==this.uact);
        (<HTMLInputElement>document.getElementById("uname")).value=x?.name||"";
        (<HTMLInputElement>document.getElementById("upassword")).value="";
        (<HTMLInputElement>document.getElementById("uemail")).value=x?.email||"";
        this.arols= this.rols.filter(elemento => x?.roles_id.includes(elemento._id));
    }}
    , 50);
  }

  ucreate(){
    let name=(<HTMLInputElement>document.getElementById("uname")).value
    let password=(<HTMLInputElement>document.getElementById("upassword")).value
    let email=(<HTMLInputElement>document.getElementById("uemail")).value
    let data = new User(name,email,password,[],this.arols.map(x => x._id),[])

    if(name.length<3||password.length<3||email.length<3){
      alert("Rellena los campos")
    }else{
      this.userService.postUser(data).subscribe(res=>{
        this.gets();
        this.uchange(false);
      })
    }

  }
  
  udelete(){
    this.userService.deleteUser(this.uact).subscribe(res=>{
      this.uchange(false);
      this.gets();
    })
  }

  uput(){
    let name=(<HTMLInputElement>document.getElementById("uname")).value
    let password=(<HTMLInputElement>document.getElementById("upassword")).value
    let email=(<HTMLInputElement>document.getElementById("uemail")).value

    let data = new User(name,email,password,[],this.arols.map(x => x._id),[])
    if(password.length<3){
      delete data.password  
    }
    delete data.post_id  
    delete data.files_id 
    console.log(data)
    if(name.length<3||email.length<3){
      alert("Rellena los campos")
    }else{
    this.userService.putUser(data,this.uact).subscribe(res=>{
      this.gets();
      this.uchange(false);
    })
  }

  }
  uget(){
    let x =(<HTMLInputElement>document.getElementById("name"))
    //x.value=this.folders.find((x)=>x._id==this.act)?.name||"";
  }



  uaddrol(){
    let rol = (<HTMLInputElement>document.getElementById("urol")).value||"";
    if(this.arols.findIndex((x)=>x._id==rol)==-1){
      var r=this.rols.find((x)=>x._id==rol)
      if(r){
        this.arols.push(r)
      }
    }
  }


  uremoverol(rol:string){
    let r=this.rols.findIndex((x)=>{x._id==rol})
    if(r){
      this.arols.splice(r,1)
    }
  }


  changept(a:boolean){
    this.pt=a
  }
}
