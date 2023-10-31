import { Component } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.css'],
  providers:[PostService]
})
export class IntranetComponent {
  constructor(private PostService:PostService){
  }
  posts:Post[]=[]
  ngOnInit(): void {
    this.PostService.getPosts().subscribe(res=>{
      this.posts= res as Post[]
    })
  }
  
}
