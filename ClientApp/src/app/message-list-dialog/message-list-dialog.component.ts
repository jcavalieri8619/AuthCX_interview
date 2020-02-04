import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatSlideToggleChange} from '@angular/material';
import {IUserMessage} from '../models/user-message';
import {IMessage} from '../models/message';
import {of, merge, asapScheduler, asyncScheduler, animationFrameScheduler, queueScheduler} from 'rxjs';

interface DialogData {
  messages: IMessage[];
  key: string;
}

@Component({
  selector: 'app-message-list-dialog',
  templateUrl: './message-list-dialog.component.html',
  styleUrls: ['./message-list-dialog.component.scss']
})
export class MessageListDialogComponent implements OnInit, AfterViewInit {

  showNoStopMessages = false;
  messages: string[];
  noStopMessages: string[];
  title: string;

  private initHeight: number;
  @ViewChild('dialogRoot', {read: ElementRef, static: false}) host: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {

    this.messages = this.data.messages.map(value => value.text);
    this.noStopMessages = this.data.messages.map(value => value.noStopText);
    this.title = this.data.key;

  }

  onSliderChange($event: MatSlideToggleChange) {
    this.showNoStopMessages = $event.checked;
  }

  ngAfterViewInit(): void {
    this.initHeight = (this.host.nativeElement as HTMLDivElement).clientHeight;
    animationFrameScheduler.schedule(_ => (this.host.nativeElement as HTMLDivElement).style.height = `${this.initHeight}px`, 0);

  }
}
