import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, HeaderComponent, TableComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PaginatorModule { }
