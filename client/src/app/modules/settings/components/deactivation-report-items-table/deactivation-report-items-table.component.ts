import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeactivationReportItem } from '../../../../../../../src/common/interfaces/profile-deactivation-report.interface';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'gv-deactivation-report-items-table',
  templateUrl: './deactivation-report-items-table.component.html',
  styleUrls: ['./deactivation-report-items-table.component.scss']
})
export class DeactivationReportItemsTableComponent implements OnInit {

  @Input() reportItems: DeactivationReportItem[]
  @Input() category: 'class' | 'property'
  @Input() status: 'deactivated' | 'maintained'

  displayedColumns: string[] = ['id', 'identifierInNamespace', 'label', 'numberOfInstances', 'icon'];
  dataSource = new MatTableDataSource<DeactivationReportItem>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.reportItems;
  }

}
