import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SysConfig } from '@kleiolab/lib-config';
import { DeactivationReportItem } from '@kleiolab/lib-sdk-lb4';

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

  ontomeUrl = SysConfig.ONTOME_URL;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.reportItems;
  }

}
