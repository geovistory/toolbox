import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AcEllipseDescComponent } from './ac-ellipse-desc.component';
import { mock, instance, when } from 'ts-mockito';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { CesiumService } from '../../services/cesium/cesium.service';
import { mockProvider, providerFromMock } from '../../utils/testingUtils';
import { EllipseDrawerService } from '../../services/drawers/ellipse-drawer/ellipse-drawer.service';

describe('AcEllipseDescComponent', () => {
    let component: AcEllipseDescComponent;
    let fixture: ComponentFixture<AcEllipseDescComponent>;

    const cesiumService = mock(CesiumService);
    const primitiveCollection = mock(Cesium.PrimitiveCollection);

    when(cesiumService.getScene()).thenReturn({primitives: instance(primitiveCollection)});

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AcEllipseDescComponent],
            providers: [EllipseDrawerService,
                        providerFromMock(CesiumService, cesiumService),
                        mockProvider(LayerService),
                        mockProvider(CesiumProperties),
                        mockProvider(ComputationCache)]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AcEllipseDescComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
