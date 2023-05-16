import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
// import the GridModule for the Grid component
import { TableModule } from 'primeng/table';
import { ClipboardModule } from 'ngx-clipboard';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SplitButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    TableModule,
    ClipboardModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
