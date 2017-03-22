import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {StudentListComponent} from "./student/student.list.component";
import {StudentComponent} from "./student/student.component";

@NgModule({
    declarations: [StudentListComponent, StudentComponent],
    imports: [BrowserModule, FormsModule, HttpModule],
    bootstrap: [StudentListComponent]
})
export class AppModule {}
