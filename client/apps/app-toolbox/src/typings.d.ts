/* SystemJS module definition */
declare let module: NodeModule;
interface NodeModule {
  id: string;
}

interface CesiumJulianDate {
  dayNumber: number;
  secondsOfDay: number;
}
