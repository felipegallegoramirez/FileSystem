import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FolderComponent } from './components/folder/folder.component';
import { VfolderComponent } from './components/vfolder/vfolder.component'; 
import { IntranetComponent } from './components/intranet/intranet.component';
import { AdmonComponent } from './components/admon/admon.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'aboutus', component: HomeComponent },
  { path:'post/:id', component: PostComponent },
  { path:'create', component: CreatePostComponent },
  { path:'folders', component: FolderComponent },
  { path:'folder/:id', component: VfolderComponent },
  { path:'intranet', component: IntranetComponent },
  { path:'porfile', component: AdmonComponent },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
