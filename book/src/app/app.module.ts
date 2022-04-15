import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormComponent } from './components/form/form.component';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { TopComponent } from './components/top/top.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';

import { HttpClientModule } from '@angular/common/http';
import { FriendComponent } from './components/friend/friend.component';
import { ChatComponent } from './components/chat/chat.component';
import { LeftChatComponent } from './components/left-chat/left-chat.component';
import { RightChatComponent } from './components/right-chat/right-chat.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TopComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    FriendComponent,
    ChatComponent,
    LeftChatComponent,
    RightChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSidenavModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
