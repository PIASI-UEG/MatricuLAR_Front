import { NgModule } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {SearchComponent} from "./seach-component/search.component";
import {SearchService} from "./shared/search.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [SearchComponent],
  providers: [SearchService],
  exports: [SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatCardModule,
    MatSelectModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SearchModule { }
