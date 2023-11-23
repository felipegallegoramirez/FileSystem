import { Component } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { Folder } from 'src/app/models/folder';
import { ImageService } from 'src/app/services/image.service';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-vfolder',
  templateUrl: './vfolder.component.html',
  styleUrls: ['./vfolder.component.css']
})
export class VfolderComponent {
  files:File[]=[]
  constructor(private folderService:FolderService,private fileService:FileService, private imageService:ImageService,public activatedRoute:ActivatedRoute, public userService:UserService, private authService:AuthService){}
  id:string=localStorage.getItem("id")||""
  idFolder:string=""
  agr:boolean=false;
  agr2:boolean=false;
  edit:boolean=false;
  act:string=""
  afolders:Folder[]=[]
  folders:Folder[]=[]
  public:boolean=false
  admon:boolean=false

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => { 
      this.idFolder= params['id'];
      if(this.idFolder=="6540565607a77321ce07e16d"){
        this.public=true
      }
      this.gets();
    });

  }

  change(){
    this.agr=this.agr==true?false:true;
    this.agr2=false
  }


  create(){
    let file=(<HTMLInputElement>document.getElementById("file")).files?.item(0)
    let name=(<HTMLInputElement>document.getElementById("name")).value

    if(name.length>2 && file){
        this.imageService.postFile(file).subscribe(res=>{
          let id=localStorage.getItem("id")
          var data = new File(name,res.url,id||"")
          console.log(res)
          this.fileService.postFile(data).subscribe(res=>{
            this.gets()
            this.folderService.getFolder(this.idFolder).subscribe(res2=>{
              let x = new Folder(res2.name,res2.image,res2.rol,res2.users,res2.files_id,res2.owner,res2._id);
              if(!x.files_id){
                x.files_id=[res._id]
              }else{
                x.files_id.push(res._id)
              }

              console.log(x)
              this.folderService.putFolder(x,x._id).subscribe(rex=>{
                this.gets();
                this.change();
                console.log(rex)
              })
            })
          })
        })
      }else{
        alert("Debe llenar todos los campos")
      }

  }

  gets(){
    let id=this.idFolder
    let iduser=localStorage.getItem("id")||""
    this.fileService.getFiles(id).subscribe(res=>{
      this.files=[]
      this.files=res as File[]
      this.folderService.getFolder(id).subscribe(res2=>{
        let x=res2
        this.userService.getUser(iduser).subscribe(res3=>{
          let user = res3 as User
          if (x.owner==user._id|| x.users.indexOf(user._id)!=-1|| x.rol.find(y=>user.roles_id.indexOf(y)!=-1)!=null){

          }else{
            this.authService.admon().subscribe(res=>{
            if(!this.public){
              if(res.status!="admon"){
                window.location.replace("http://localhost:4200/folders");
              }
            }
              if(res.status=="admon"){
                this.admon=true;
              }
            })
          }
        })

      })

    })

    }
  
  delete(id:string){

      this.folderService.getFolder(this.idFolder).subscribe(res2=>{
        let x = new Folder(res2.name,res2.image,res2.rol,res2.users,res2.files_id,res2.owner,res2._id);
        let indice = x.files_id.indexOf(id);
        if (indice !== -1) {
          x.files_id.splice(indice, 1);
        }
        this.folderService.putFolder(x,x._id).subscribe(rex=>{
          this.fileService.deleteFile(id||"").subscribe(res=>{
            this.gets();
          })
        })
      })

    

  }

  


}

