import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar esto
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';  // Importa esto también
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Si usas MatSnackBar
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { QuizComponent } from './components/quiz/quiz.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuizComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatIconModule,
    MatRadioModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
