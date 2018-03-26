import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { InfLanguage, InfLanguageApi } from 'app/core';



@Component({
  selector: 'gv-language-search-typeahead',
  templateUrl: './language-search-typeahead.component.html',
  styleUrls: ['./language-search-typeahead.component.scss']
})
export class LanguageSearchTypeaheadComponent implements OnInit {

  //Language search
  public languageSearch: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  _language:InfLanguage;

  @Input() get language(){
    return this._language;
  }

  @Output() languageChange = new EventEmitter();

  set language(language){
    if(!language){
        this.languageChange.emit();
    }
    else if(typeof language === 'string'){
      this.languageChange.emit();
    }
    else if(language.pk_entity){
      this._language = language;
      this.languageChange.emit(this._language);
    }
  }


  constructor(
    private languageApi: InfLanguageApi
  ) { }

  ngOnInit() {
  }


  search = (text$: Observable<string>) =>
  text$
  .debounceTime(300)
  .distinctUntilChanged()
  .do(() => this.searching = true)
  .switchMap(term =>
    this.languageApi.queryByString(term)
    .do(() => this.searchFailed = false)
    .catch(() => {
      this.searchFailed = true;
      return Observable.of([]);
    }))
    .do(() => this.searching = false)
    .merge(this.hideSearchingWhenUnsubscribed);

    formatter = (x) => x.notes;

}
