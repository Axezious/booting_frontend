// import {Injectable, PipeTransform} from '@angular/core';

// import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

// import {AgentRelations} from '../../model/agent-relations';
// import {Users} from '../../model/users';
// import {DatePipe} from '@angular/common';
// import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
// // import {SortColumn, SortDirection} from './sortable.directive';

// interface SearchResult {
//   agentRelations: AgentRelations[];
//   total: number;
// }

// interface State {
//   page: number;
//   pageSize: number;
//   searchTerm: string;
//   // sortColumn: SortColumn;
//   // sortDirection: SortDirection;
// }

// @Injectable({
//   providedIn: 'root'
// })

// export class AgentRelationsService {
  
//   idAgent:Users = new Users();
//   idClient:Users = new Users();

//   AGENTRELATIONS: AgentRelations[] = [];

//   private _loading$ = new BehaviorSubject<boolean>(true);
//   private _search$ = new Subject<void>();
//   private _agentRelations$ = new BehaviorSubject<AgentRelations[]>([]);
//   private _total$ = new BehaviorSubject<number>(0);

//   private _state: State = {
//     page: 1,
//     pageSize: 5,
//     searchTerm: '',
//     // sortColumn: '',
//     // sortDirection: ''
//   };

//   constructor(private pipe: DatePipe) {
//   	this.idAgent.name = 'Surti';
//   	this.idClient.name = 'Tejo';
//     this._search$.pipe(
//       tap(() => this._loading$.next(true)),
//       debounceTime(200),
//       switchMap(() => this._search()),
//       delay(200),
//       tap(() => this._loading$.next(false))
//     ).subscribe(result => {
//       this._agentRelations$.next(result.agentRelations);
//       this._total$.next(result.total);
//     });

//     this._search$.next();
//   }

//   matches(agentRelation: AgentRelations, term: string, pipe: PipeTransform) {
//   return agentRelation.idAgent.name.toLowerCase().includes(term.toLowerCase())
//     || agentRelation.idClient.name.toLowerCase().includes(term.toLowerCase())
//     || agentRelation.idClient.name.toLowerCase().includes(term.toLowerCase())
//     || pipe.transform(agentRelation.startDate).includes(term)
//     || pipe.transform(agentRelation.endDate).includes(term);
//     // || pipe.transform(agentRelation.population).includes(term);
//   }

//   get agentRelations$() { return this._agentRelations$.asObservable(); }
//   get total$() { return this._total$.asObservable(); }
//   get loading$() { return this._loading$.asObservable(); }
//   get page() { return this._state.page; }
//   get pageSize() { return this._state.pageSize; }
//   get searchTerm() { return this._state.searchTerm; }

//   set page(page: number) { this._set({page}); }
//   set pageSize(pageSize: number) { this._set({pageSize}); }
//   set searchTerm(searchTerm: string) { this._set({searchTerm}); }
//   // set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
//   // set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

//   private _set(patch: Partial<State>) {
//     Object.assign(this._state, patch);
//     this._search$.next();
//   }

//   private _search(): Observable<SearchResult> {
//     const {/*sortColumn, sortDirection,*/ pageSize, page, searchTerm} = this._state;

//     // 1. sort
//     // let countries = sort(COUNTRIES, sortColumn, sortDirection);

//     // 2. filter
//     let agentRelations = this.AGENTRELATIONS;
//     agentRelations = agentRelations.filter(agentRelation => this.matches(agentRelation, searchTerm, this.pipe));
//     const total = agentRelations.length;

//     // 3. paginate
//     agentRelations = agentRelations.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
//     return of({agentRelations, total});
//   }
// }

