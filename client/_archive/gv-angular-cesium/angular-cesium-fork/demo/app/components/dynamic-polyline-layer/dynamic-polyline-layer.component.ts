import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AcNotification } from '../../../../src/angular-cesium/models/ac-notification';
import { AcLayerComponent } from '../../../../src/angular-cesium/components/ac-layer/ac-layer.component';
import { TracksDataProvider } from '../../../utils/services/dataProvider/tracksDataProvider.service';

@Component({
	selector: 'dynamic-polyline-layer',
	templateUrl: 'dynamic-polyline-layer.component.html',
	styleUrls: ['dynamic-polyline-layer.component.css'],
	providers: [TracksDataProvider]
})
export class DynamicPolylineLayerComponent implements OnInit {
	@ViewChild(AcLayerComponent) layer: AcLayerComponent;

	polylines$: Observable<AcNotification>;
	Cesium = Cesium;
	show = true;

	constructor(private tracksDataProvider: TracksDataProvider) {
	}

	ngOnInit() {
		this.polylines$ = this.tracksDataProvider.get();
	}

	removeAll() {
		this.layer.removeAll();
	}

	setShow($event: boolean) {
		this.show = $event
	}

}
