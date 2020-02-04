import {Component, OnInit} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {UserMessageService} from '../services/user-message.service';
import {IUserMessagesByKey} from '../models/user-messages-by-key';
import {MatDialog, MatDialogState} from '@angular/material/dialog';
import {MessageListDialogComponent} from '../message-list-dialog/message-list-dialog.component';
import {MatTabChangeEvent} from '@angular/material';
import {IUserMessage} from '../models/user-message';
import {asyncScheduler, Subject} from 'rxjs';

interface GraphData {
  name: string;
  value: number;
}

interface GraphDataEvent {
  name: string;
  value: number;
  label: string;
}

@Component({
  selector: 'app-message-analysis',
  templateUrl: './message-analysis.component.html',
  styleUrls: ['./message-analysis.component.scss']
})
export class MessageAnalysisComponent implements OnInit {
  graphData: GraphData[] = [] as GraphData[];
  keyedData: { [key: string]: IUserMessage[] } = {};

  cachedByUser: IUserMessagesByKey[] = null;
  cachedByDomain: IUserMessagesByKey[] = null;

  tabDataLoaders: { [key: string]: () => void };
  currentTab = 'ByEmailDomain';
  view: any[];
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';
  colorScheme = {
    domain: ['#a46d9f', '#307da1', '#c7305b', '#00bb74']
  };

  finishedLoading$: Subject<boolean> = new Subject<boolean>();

  constructor(private messagesService: UserMessageService, public dialog: MatDialog) {
    this.tabDataLoaders = {'ByEmailDomain': this.byEmailDomain, 'ByUser': this.byUser};

  }


  ngOnInit() {
    this.byEmailDomain();
  }

  byEmailDomain = () => {
    if (this.cachedByDomain === null) {
      this.messagesService.getMessagesByAggEmailDomain().subscribe(value => {
        this.cachedByDomain = value;
        this.graphData = value.map(value1 => ({value: value1.messages.length, name: value1.key} as GraphData));
        value.forEach(value1 => this.keyedData[value1.key] = value1.messages);

      });
    } else {
      this.graphData = this.cachedByDomain.map(value1 => ({value: value1.messages.length, name: value1.key} as GraphData));
      this.cachedByDomain.forEach(value1 => this.keyedData[value1.key] = value1.messages);
    }

  };

  byUser = () => {
    if (this.cachedByUser === null) {
      this.messagesService.getMessagesByAggUserId().subscribe(value => {
        this.cachedByUser = value;

        this.graphData = value.map(value1 => ({
          value: value1.messages.length,
          name: value1.messages.length > 0 ? value1.messages[0].userName : value1.key
        } as GraphData));
        value.forEach(value1 => this.keyedData[(value1.messages.length > 0 ? value1.messages[0].userName : value1.key)] = value1.messages);
      });

    } else {
      this.graphData = this.cachedByUser.map(value1 => ({
        value: value1.messages.length,
        name: value1.messages.length > 0 ? value1.messages[0].userName : value1.key
      } as GraphData));
      this.cachedByUser.forEach(value1 => this.keyedData[(value1.messages.length > 0 ? value1.messages[0].userName : value1.key)] = value1.messages);
    }

  };

  onSelect($event: GraphDataEvent) {
    this.openDialog($event.name);
  }

  onActivate($event: GraphDataEvent) {

  }

  onDeactivate($event: GraphDataEvent) {

  }

  openDialog(key: string) {
    const messages = this.keyedData[key];
    const dialogRef = this.dialog.open(MessageListDialogComponent,
      {
        autoFocus: true,
        width: '950px',
        data: {key, messages}
      });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onTabChange($event: MatTabChangeEvent) {
    // this.finishedLoading$.next(false);
    this.currentTab = $event.tab.textLabel;
    this.tabDataLoaders[this.currentTab]();
  }
}
