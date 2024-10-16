import { Routes } from '@angular/router';
import { AddInstituteComponent } from './components/add-institute/add-institute.component';
import { InstituteComponent } from './components/institute/institute.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=> InstituteComponent
    },
    {
        path:'add',
        loadComponent:() => AddInstituteComponent
    },
    {
        path:'edit-profile',
        loadComponent:()=>EditProfileComponent
    },
    {
        path:'add-course',
        loadComponent:()=>AddCourseComponent
    }
];
