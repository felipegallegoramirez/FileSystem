import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FolderComponent } from './components/folder/folder.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'aboutus', component: HomeComponent },
  { path:'post:id', component: PostComponent },
  { path:'create', component: CreatePostComponent },
  { path:'folders', component: FolderComponent },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
