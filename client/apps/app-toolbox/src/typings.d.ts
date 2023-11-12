/* SystemJS module definition */
declare let module: NodeModule;
interface NodeModule {
  id: string;
}
declare let Cesium;

interface CesiumJulianDate {
  dayNumber: number;
  secondsOfDay: number;
}
