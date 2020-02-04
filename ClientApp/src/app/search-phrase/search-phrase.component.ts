import {Component, OnInit} from '@angular/core';
import {UserMessageService} from '../services/user-message.service';


@Component({
  selector: 'app-search-phrase',
  templateUrl: './search-phrase.component.html',
  styleUrls: ['./search-phrase.component.scss']
})
export class SearchPhraseComponent implements OnInit {

  constructor(private messagesService: UserMessageService) {
  }

  ngOnInit() {
  }

}
