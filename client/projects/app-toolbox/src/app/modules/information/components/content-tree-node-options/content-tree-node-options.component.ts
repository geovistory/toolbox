import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ImportTableSocket } from 'projects/app-toolbox/src/app/core/sockets/sockets.module';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContentTreeNode } from '../content-tree/content-tree.component';


interface ParentNodeInfo {
  pkParent: number,
  parentIsF2Expression: boolean
}
export interface ContentTreeClickEvent {
  openNode?: ContentTreeNode,
  removeStatement?: ContentTreeNode

  addExpressionPortion?: ParentNodeInfo,
  addText?: ParentNodeInfo,
  addTable?: ParentNodeInfo,
}

@Component({
  selector: 'gv-content-tree-node-options',
  templateUrl: './content-tree-node-options.component.html',
  styleUrls: ['./content-tree-node-options.component.scss']
})
export class ContentTreeNodeOptionsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() node: ContentTreeNode;
  @Input() isDigital: boolean;
  @Input() pkParent: number;
  @Input() rootIsF2Expression = false;
  @Input() isAdmin: boolean;

  @Output() clicked = new EventEmitter<ContentTreeClickEvent>();

  loaded$ = new BehaviorSubject<boolean>(true);
  mode$ = new BehaviorSubject<string>('indeterminate');
  value$ = new BehaviorSubject<number>(0);

  constructor(
    private importTableSocket: ImportTableSocket
  ) { }

  ngOnInit() {
    this.importTableSocket.cleanConnect();

    if (this.node && this.isDigital) {
      if (this.node.datDigital.fk_system_type == 3287) {
        this.loaded$.next(false);
        this.importTableSocket.emit('listenDigitals', [(this.node as any).pkDigital]);
        this.importTableSocket.on('state_' + (this.node as any).pkDigital, (state: { id: number, advancement: number, infos: string }) => {
          this.loaded$.next(state.advancement == 100);
          this.mode$.next(0 < state.advancement ? 'determinate' : 'indeterminate');
          this.value$.next(state.advancement);
        })

        this.importTableSocket.fromEvent('reconnect')
          .pipe(takeUntil(this.destroy$))
          .subscribe(disconnect => {
            this.importTableSocket.emit('listenDigitals', [this.node.pkEntity]);
          })
      }
    }
  }
  openNode(n: ContentTreeNode) {
    this.clicked.emit({ openNode: n })
  }
  removeStatement(n: ContentTreeNode) {
    this.clicked.emit({ removeStatement: n })
  }

  addExpressionPortion(parentN: ParentNodeInfo) {
    this.clicked.emit({ addExpressionPortion: parentN })
  }

  addText(parentN: ParentNodeInfo) {
    this.clicked.emit({ addText: parentN })
  }

  addTable(parentN: ParentNodeInfo) {
    this.clicked.emit({ addTable: parentN })
  }


  ngOnDestroy() {
    this.importTableSocket.cleanDisconnect();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
