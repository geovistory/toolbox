import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ActivationReportItem } from '../../../../../../../server/src/lb3/common/interfaces/profile-activation-report.interface';

@Component({
  selector: 'gv-activation-report-items-table',
  templateUrl: './activation-report-items-table.component.html',
  styleUrls: ['./activation-report-items-table.component.scss']
})
export class ActivationReportItemsTableComponent implements OnInit {

  @Input() reportItems: ActivationReportItem[]
  @Input() category: 'class' | 'property'

  displayedColumns: string[] = ['id', 'identifierInNamespace', 'label'];
  dataSource = new MatTableDataSource<ActivationReportItem>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.reportItems;
  }

}
