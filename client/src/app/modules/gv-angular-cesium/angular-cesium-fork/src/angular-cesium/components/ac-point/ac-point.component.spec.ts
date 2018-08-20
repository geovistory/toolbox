import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mock, instance, when } from 'ts-mockito';
import { CesiumService } from '../../services/cesium/cesium.service';
import { providerFromMock } from '../../utils/testingUtils';
import { AcPointComponent } from './ac-point.component';
import { PointDrawerService } from '../../services/drawers/point-drawer/point-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';

describe('AcPointComponent', () => {
	let component: AcPointComponent;
	let fixture: ComponentFixture<AcPointComponent>;

	const cesiumService = mock(CesiumService);
	const pointCollection = mock(Cesium.PointPrimitiveCollection);

	when(cesiumService.getScene()).thenReturn({primitives: instance(pointCollection)});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AcPointComponent],
			providers: [PointDrawerService, MapLayersService,
				providerFromMock(CesiumService, cesiumService)]
		})
			.compileComponents();
		fixture = TestBed.createComponent(AcPointComponent);
		component = fixture.componentInstance;

	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
