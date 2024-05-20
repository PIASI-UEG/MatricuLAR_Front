import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";


export const homePageRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent
  }
];

