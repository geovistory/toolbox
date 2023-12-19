import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SysConfig } from '@kleiolab/lib-config';
import { ActivationReportItem } from '@kleiolab/lib-sdk-lb4';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-activation-report-items-table',
    templateUrl: './activation-report-items-table.component.html',
    styleUrls: ['./activation-report-items-table.component.scss'],
    standalone: true,
    imports: [MatTableModule, NgIf, MatPaginatorModule]
})
export class ActivationReportItemsTableComponent implements OnInit {

  @Input() reportItems: ActivationReportItem[]
  @Input() category: 'class' | 'property'

  displayedColumns: string[] = ['id', 'identifierInNamespace', 'label'];
  dataSource = new MatTableDataSource<ActivationReportItem>();
  ontomeUrl = SysConfig.ONTOME_URL

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.reportItems;
  }

}
