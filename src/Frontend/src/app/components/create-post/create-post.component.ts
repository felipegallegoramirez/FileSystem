import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: [ImageService,PostService]
})
export class CreatePostComponent {
  i:Array<number> =[]
  constructor(private ImageService:ImageService,private PostService:PostService, private authService:AuthService) { }
  data:any
  ngOnInit(): void {
    this.addimg();
    this.addtext();
    this.authService.admon().subscribe(res=>{
      if(res.status!="admon"){
        window.location.replace("http://localhost:4200/intranet");
      }
    })

  }

  delete():void{
    if (this.i.length>2){
    var de=<HTMLDivElement>document.getElementById("div_"+this.i.length)
    de.remove()
    this.i.pop()
  }
  }


  addimg():void{
    this.i.push(2)
    var div = document.createElement("div")
    div.id="div_"+this.i.length
    var input = document.createElement("input")
    input.type="file"
    input.id="img_"+this.i.length
    input.accept="image/png, image/jpeg"
    var p = document.createElement("p")
    p.innerHTML="Subir fichero..."
    div.style.cssText="margin: 30px 0px;background-color: var(--color-primario);color: #fff;cursor: pointer;font-size: 18px;font-weight: bold;min-height: 15px;overflow: hidden;padding: 10px;position: relative;text-align: center;width: calc(100% - 80px);box-sizing: border-box;"
    input.style.cssText="border: 10000px solid transparent;cursor: pointer;font-size: 10000px;margin: 0;opacity: 0;outline: 0 none;padding: 0;position: absolute;right: -1000px;top: -1000px;"
    div.appendChild(p)
    div.appendChild(input)
    document.getElementById("centro")?.appendChild(div)
  }

  addtext():void{
    this.i.push(1)
    var div = document.createElement("div")
    div.id="div_"+this.i.length
    var text = document.createElement("textarea")
    text.id="text_"+this.i.length
    text.style.cssText="box-sizing: border-box;margin: 30px 0px;background-color: #dddddd;color: #000000;padding: 1em;border-radius: 10px;border: 2px solid transparent;outline: none;font-weight: 500;font-size: 16px;line-height: 1.4;width: calc(100% - 80px);height: 100px;transition: all 0.2s;resize: vertical;"
    text.placeholder="Enter a message..."
    div.appendChild(text)
    document.getElementById("centro")?.appendChild(div)
  }

  crear():void{
    var asd:Array<File> =[]
    var text:Array<string> =[]
    for (var r =0;r<this.i.length;r++){
      if (this.i[r]==2){
        let x =<HTMLInputElement>document.getElementById("img_"+(r+1));
        if (x.files!=null){
          asd.push(x.files[0])
        }
      }if(this.i[r]==1){
        let x =<HTMLInputElement>document.getElementById("text_"+(r+1));
        text.push(x.value)
      }
    }
    console.log(text)


    this.ImageService.postImages(asd).subscribe(res=>{
      let x = <HTMLInputElement>document.getElementById("title");
      var title= x.value
      let or=this.i.map(numero => {if (numero === undefined) {return "";} else {return numero.toString();}});
      let post = new Post(title,"a",res.url,text,or,localStorage.getItem("id")||"")
      this.PostService.postPost(post).subscribe(t=>{
        console.log(t)
      })

    })



  }
}
