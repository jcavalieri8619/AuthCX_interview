import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPhraseComponent } from './search-phrase.component';

describe('SearchPhraseComponent', () => {
  let component: SearchPhraseComponent;
  let fixture: ComponentFixture<SearchPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
