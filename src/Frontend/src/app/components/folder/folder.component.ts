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
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {

  constructor(private folderService:FolderService,private rolService:RolService,private userService:UserService, private imageService:ImageService, private authService:AuthService){}
  id:string=localStorage.getItem("id")||""
  agr:boolean=false;
  agr2:boolean=false;
  edit:boolean=false;
  act:string=""
  afolders:Folder[]=[]
  folders:Folder[]=[]

  rols:Rol[]=[]
  users:User[]=[]
  arols:Array<Rol> =[]
  ausers:Array<User> =[]
  admon:boolean=false;

  

  ngOnInit() {
    this.gets();
    this.rolService.getRols().subscribe(res=>{
      this.rols=res as Rol[]
    })
    this.userService.getUsers().subscribe(res=>{
      this.users=res as User[]
    })

    this.authService.admon().subscribe(res=>{
      if(res.status=="admon"){
        this.admon=true;
      }
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
    this.arols=[]
    this.ausers=[]
    let file=(<HTMLInputElement>document.getElementById("file"))
    let name=(<HTMLInputElement>document.getElementById("name"))
    if(name.value.length>2){
      this.agr2=true
      if(this.edit){
        let x=this.folders.find((x)=>x._id==this.act)
        console.log(x)
        if(x){
          this.arols= this.rols.filter(elemento => x?.rol.includes(elemento._id));
          this.ausers= this.users.filter(elemento => x?.users.includes(elemento._id));
        }
      }else{
        if(file.files?.item(0)){}else{
          this.agr2=false
          alert("Debe llenar todos los campos")
        }
      }

    }else{
      alert("Debe llenar todos los campos")
    }
  }

  create(){
    let file=(<HTMLInputElement>document.getElementById("file")).files?.item(0)
    let name=(<HTMLInputElement>document.getElementById("name")).value


    if(file){
      this.imageService.postImage(file).subscribe(res=>{
        let id=localStorage.getItem("id")
        var data = new Folder(name,res.url,this.arols.map(x => x._id),this.ausers.map(x => x._id),[],id||"")
        console.log(res)
        this.folderService.postFolder(data).subscribe(res=>{
          console.log(res)
          this.gets()
        })
      })
    }

  }
  gets(){
    let id=localStorage.getItem("id")
    this.folderService.getFolders(id||"").subscribe(res=>{
      this.folders=[]
      this.folders=res as Folder[];
      this.search()
    })
  }
  delete(){
    this.folderService.deleteFolder(this.act).subscribe(res=>{
      this.change(false);
      this.gets();
    })
  }

  put(){
    let file=(<HTMLInputElement>document.getElementById("file")).files?.item(0)
    let name=(<HTMLInputElement>document.getElementById("name")).value

    let x=this.folders.find((x)=>x._id==this.act)
    if(file){
      this.imageService.putImage(file,x?.image||"").subscribe(res=>{
        let id=localStorage.getItem("id")
        var data = new Folder(name,res.url,this.arols.map(x => x._id),this.ausers.map(x => x._id),[],id||"",this.act)
        console.log(res)
        this.folderService.putFolder(data,this.act).subscribe(res=>{
          console.log(res)
          this.gets()
        })
      })
    }else{
      let id=localStorage.getItem("id")
      var data = new Folder(name,x?.image,this.arols.map(x => x._id),this.ausers.map(x => x._id),[],id||"",this.act)
      this.folderService.putFolder(data,this.act).subscribe(res=>{
        console.log(res)
        this.gets()
      })
    }

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

  search(){
    let search = (<HTMLInputElement>document.getElementById("search")).value;
    this.afolders=this.folders.filter(x=>x.name.includes(search))
  }

}
