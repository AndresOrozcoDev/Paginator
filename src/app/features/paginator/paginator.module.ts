import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './page/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { FiltersComponent } from './components/filters/filters.component';
import { PaginationComponent } from './components/pagination/pagination.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent, HeaderComponent, TableComponent, FiltersComponent, PaginationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class PaginatorModule { }
