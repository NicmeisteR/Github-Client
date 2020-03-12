import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';

// ███╗   ██╗███████╗██████╗ ██╗   ██╗██╗      █████╗ ██████╗ 
// ████╗  ██║██╔════╝██╔══██╗██║   ██║██║     ██╔══██╗██╔══██╗
// ██╔██╗ ██║█████╗  ██████╔╝██║   ██║██║     ███████║██████╔╝
// ██║╚██╗██║██╔══╝  ██╔══██╗██║   ██║██║     ██╔══██║██╔══██╗
// ██║ ╚████║███████╗██████╔╝╚██████╔╝███████╗██║  ██║██║  ██║
// ╚═╝  ╚═══╝╚══════╝╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
//                                                            
import { 
  NbThemeModule, 
  NbSidebarModule, 
  NbLayoutModule, 
  NbButtonModule,
  NbMenuModule,
  NbCardModule,
  NbSearchModule,
  NbIconModule,
  NbTooltipModule,
  NbAccordionModule
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';

// ██╗   ██╗██╗███████╗██╗    ██╗███████╗
// ██║   ██║██║██╔════╝██║    ██║██╔════╝
// ██║   ██║██║█████╗  ██║ █╗ ██║███████╗
// ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║╚════██║
//  ╚████╔╝ ██║███████╗╚███╔███╔╝███████║
//   ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚══════╝
//          
import { ProjectsComponent } from './views/projects/projects.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderComponent } from './partials/header/header.component';
import { MenuComponent } from './partials/menu/menu.component';
import { AboutComponent } from './views/about/about.component';
import { ReadingListComponent } from './views/reading-list/reading-list.component';

// ██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
// ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
// ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
// ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝
//                                                    
const routes: Routes = [
  // { path: '', component: HomeComponent, pathMatch: 'full'},
  // { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'projects', component: ProjectsComponent},
  // { path: 'projects/:id', component: ProjectComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    FilterPipe,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    AboutComponent,
    ReadingListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash:false}),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbButtonModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbCardModule,
    NbSearchModule,
    NbIconModule,
    NbTooltipModule,
    NbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
