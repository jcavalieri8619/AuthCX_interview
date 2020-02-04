import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './nav-menu/nav-menu.component';
import {UserListComponent} from './user-list/user-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageListDialogComponent} from './message-list-dialog/message-list-dialog.component';
import {MatDialogModule, MatProgressBarModule, MatSlideToggleModule, MatTabsModule} from '@angular/material';
import {MessageAnalysisComponent} from './message-analysis/message-analysis.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchPhraseComponent } from './search-phrase/search-phrase.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UserListComponent,
    MessageListDialogComponent,
    MessageAnalysisComponent,
    HomeComponent,
    SearchPhraseComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatProgressBarModule
    ],
  entryComponents: [MessageListDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
