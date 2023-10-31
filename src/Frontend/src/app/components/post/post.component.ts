import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent {
  
  constructor(public activatedRoute:ActivatedRoute,private PostService:PostService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      var idsession= params['id'];
      this.PostService.getPost(idsession).subscribe((res)=>{
        this.datos(res);
      })
      
    });
  }
  
  public datos (data:any) :void{
    console.log(data)
    let x = <HTMLElement>document.getElementById("titulo")
      x.innerHTML=data.title
      let img=0
      let tex=0
    for (var i=0;i<data.order.length;i++){
        
      if (data.order[i]=="2"){
        this.imagen(data.images[img])
        img++;
      }
      else if (data.order[i]=="1"){
        this.texto(data.text[tex])
        tex++
      } 
    }
  }

  public imagen(a:string):void{
    let y = document.createElement("img")
    y.src="http://localhost:3000/public/"+a
    y.style.cssText="width: 600px;border-radius: 20px;box-shadow: 20px 10px 30px #000000a0;margin: 20px 0px;"
    document.getElementById("centro")?.appendChild(y)
  }
  public texto(a:string):void{
    let y = document.createElement("p")
    y.innerHTML=a
    let z= document.createElement("div")
    z.style.cssText="margin: 20px 0px;border-radius: 20px;text-align: initial;padding: 10px;box-sizing: border-box;box-shadow: 20px 10px 30px #000000a0;"
    z.appendChild(y)
    document.getElementById("centro")?.appendChild(z)
  }

  public create(){}

  

}


