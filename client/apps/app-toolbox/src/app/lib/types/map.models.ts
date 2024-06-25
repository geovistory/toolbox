export type Czml = CzmlPacket[]
/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet
 */
export interface CzmlPacket {

  id: string

  delete?: boolean

  name?: string

  parent?: string

  description?: CzmlString

  clock?: CzmlClock

  version?: string

  availability?: CzmlTimeIntervalCollection

  properties?: CzmlCustomProperties

  position?: CzmlPosition

  orientation?: CzmlOrientation

  viewFrom?: CzmlViewFrom

  billboard?: CzmlBillboard

  box?: CzmlBox

  // corridor?: Corridor

  // cylinder?: Cylinder

  // ellipse?: Ellipse

  // ellipsoid?: Ellipsoid

  label?: CzmlLabel

  // model?: Model

  // path?: Path

  point?: CzmlPoint

  // polygon?: Polygon

  // polyline?: Polyline

  // rectangle?: Rectangle

  // wall?: Wall

  // agi_conicSensor?: ConicSensor

  // agi_customPatternSensor?: CustomPatternSensor

  // agi_rectangularSensor?: RectangularSensor

  // agi_fan?: Fan

  // agi_vector?: Vector
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/InterpolatableProperty
 */
export interface CzmlInterpolatableProperty {
  epoch?: string;
  interpolationAlgorithm?: 'LINEAR' | 'LAGRANGE' | 'HERMITE';
  interpolationDegree?: number;
  forwardExtrapolationType?: 'NONE' | 'HOLD' | 'EXTRAPOLATE';
  forwardExtrapolationDuration?: number;
  backwardExtrapolationType?: 'NONE' | 'HOLD' | 'EXTRAPOLATE';
  backwardExtrapolationDuration?: number;
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Position
 */
export interface CzmlPosition extends CzmlInterpolatableProperty {
  referenceFrame?: 'FIXED' | 'INERTIAL'
  cartesian?: CzmlCartesian3Value;
  cartographicDegrees?: CzmlCartographicValue;
  cartographicRadians?: CzmlCartographicValue;
  cartesianVelocity?: CzmlCartesian3VelocityValue;
  reference?: CzmlReferenceValue;
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Orientation
 */
export interface CzmlOrientation extends CzmlInterpolatableProperty {
  unitQuaternion?: CzmlUnitQuaternionValue;
  velocityReference?: CzmlReferenceValue;
  reference?: CzmlReferenceValue;
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/String
 */
export type CzmlString = string | {
  string?: string;
  reference?: CzmlReferenceValue;
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Clock
 */
export interface CzmlClock {
  interval?: string;

  currentTime?: CzmlTime;

  multiplier?: number;

  range?: CzmlClockRange;

  step?: CzmlClockStep;
}
/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CustomProperties
 */
export interface CzmlCustomProperties {
  [key: string]: CzmlCustomProperty
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CustomProperty
 */
export interface CzmlCustomProperty extends CzmlInterpolatableProperty {

  boolean?: boolean;

  boundingRectangle?: CzmlBoundingRectangleValue

  cartesian?: CzmlCartesian3Value

  cartographicRadians?: CzmlCartographicValue

  cartographicDegrees?: CzmlCartographicValue

  cartesian2?: CzmlCartesian2Value

  unitCartesian?: CzmlUnitCartesian3Value

  spherical?: CzmlSphericalValue

  unitSpherical?: CzmlUnitSphericalValue

  rgba?: CzmlRgbaValue

  rgbaf?: CzmlRgbafValue

  colorBlendMode?: CzmlColorBlendModeValue

  cornerType?: CzmlCornerTypeValue

  heightReference?: CzmlHeightReferenceValue

  horizontalOrigin?: CzmlHorizontalOriginValue

  labelStyle?: CzmlLabelStyleValue

  number?: CzmlDoubleValue

  nearFarScalar?: CzmlNearFarScalarValue

  unitQuaternion?: CzmlUnitQuaternionValue

  shadowMode?: CzmlShadowModeValue

  string?: string

  stripeOrientation?: CzmlStripeOrientationValue

  wsen?: CzmlCartographicRectangleValue

  wsenDegrees?: CzmlCartographicRectangleValue

  uri?: CzmlUriValue

  verticalOrigin?: CzmlVerticalOriginValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ViewFrom
 */
export interface CzmlViewFrom {

  cartesian?: CzmlCartesian3Value

  reference?: CzmlReferenceValue
}


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Billboard
 */
export interface CzmlBillboard {
  show?: boolean;

  image: CzmlUri;

  scale?: CzmlDouble

  pixelOffset?: CzmlPixelOffset

  eyeOffset?: CzmlEyeOffset

  horizontalOrigin?: CzmlHorizontalOrigin

  verticalOrigin?: CzmlVerticalOrigin

  heightReference?: CzmlHeightReference

  color?: CzmlColor

  rotation?: CzmlDouble

  alignedAxis?: CzmlAlignedAxis

  sizeInMeters?: Boolean

  width?: CzmlDouble

  height?: CzmlDouble

  scaleByDistance?: CzmlNearFarScalar

  translucencyByDistance?: CzmlNearFarScalar

  pixelOffsetScaleByDistance?: CzmlNearFarScalar

  imageSubRegion?: CzmlBoundingRectangle

  distanceDisplayCondition?: CzmlDistanceDisplayCondition

  disableDepthTestDistance?: CzmlDouble
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Uri
 */
export interface CzmlUri {

  uri?: CzmlUriValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Double
 */
export type CzmlDouble = number | CzmlDoubleI;
export interface CzmlDoubleI extends CzmlInterpolatableProperty {

  number?: CzmlDoubleValue

  reference?: CzmlReferenceValue

}


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/PixelOffset
 */
export interface CzmlPixelOffset extends CzmlInterpolatableProperty {

  cartesian2?: CzmlCartesian2Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/EyeOffset
 */
export interface CzmlEyeOffset extends CzmlInterpolatableProperty {

  cartesian?: CzmlCartesian3Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/HorizontalOrigin
 */
export interface CzmlHorizontalOrigin extends CzmlInterpolatableProperty {

  horizontalOrigin?: CzmlHorizontalOriginValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/VerticalOrigin
 */
export interface CzmlVerticalOrigin extends CzmlInterpolatableProperty {

  verticalOrigin?: CzmlVerticalOriginValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/HeightReference
 */
export interface CzmlHeightReference extends CzmlInterpolatableProperty {

  heightReference?: CzmlHeightReferenceValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Color
 */
export interface CzmlColor extends CzmlInterpolatableProperty {

  rgba?: CzmlRgbaValue

  rgbaf?: CzmlRgbafValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/AlignedAxis
 */
export interface CzmlAlignedAxis extends CzmlInterpolatableProperty {

  unitCartesian?: CzmlUnitCartesian3Value

  unitSpherical?: CzmlUnitSphericalValue

  reference?: CzmlReferenceValue

  velocityReference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/NearFarScalar
 */
export interface CzmlNearFarScalar extends CzmlInterpolatableProperty {

  nearFarScalar?: CzmlNearFarScalarValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/BoundingRectangle
 */
export interface CzmlBoundingRectangle extends CzmlInterpolatableProperty {

  boundingRectangle?: CzmlBoundingRectangleValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/DistanceDisplayCondition
 */
export interface CzmlDistanceDisplayCondition extends CzmlInterpolatableProperty {

  distanceDisplayCondition?: CzmlDistanceDisplayConditionValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Box
 */
export interface CzmlBox {

  show?: Boolean

  dimensions: CzmlBoxDimensions

  fill?: Boolean

  material?: CzmlMaterial

  outline?: Boolean

  outlineColor?: CzmlColor

  outlineWidth?: CzmlDouble

  shadows?: CzmlShadowMode

  distanceDisplayCondition?: CzmlDistanceDisplayCondition

}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/BoxDimensions
 */
export interface CzmlBoxDimensions extends CzmlInterpolatableProperty {

  cartesian?: CzmlCartesian3Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Material
 */
export interface CzmlMaterial extends CzmlInterpolatableProperty {

  solidColor?: CzmlSolidColorMaterial

  image?: CzmlImageMaterial

  grid?: CzmlGridMaterial

  stripe?: CzmlStripeMaterial
}


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/SolidColorMaterial
 */
export interface CzmlSolidColorMaterial extends CzmlInterpolatableProperty {

  color?: CzmlColor
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ImageMaterial
 */
export interface CzmlImageMaterial extends CzmlInterpolatableProperty {

  image?: CzmlUri

  repeat?: CzmlRepeat

  color?: CzmlColor

  transparent?: boolean
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Repeat
 */
export interface CzmlRepeat extends CzmlInterpolatableProperty {

  cartesian2?: CzmlCartesian2Value

  reference?: CzmlReferenceValue
}

/*
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/GridMaterial
 */
export interface CzmlGridMaterial extends CzmlInterpolatableProperty {

  color?: CzmlColor

  cellAlpha?: CzmlDouble

  lineCount?: CzmlLineCount

  lineThickness?: CzmlLineThickness

  lineOffset?: CzmlLineOffset
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/LineCount
 */
export interface CzmlLineCount extends CzmlInterpolatableProperty {

  cartesian2?: CzmlCartesian2Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/LineThickness
 */
export interface CzmlLineThickness extends CzmlInterpolatableProperty {

  cartesian2?: CzmlCartesian2Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/LineOffset
 */
export interface CzmlLineOffset extends CzmlInterpolatableProperty {

  cartesian2?: CzmlCartesian2Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ShadowMode
 */
export interface CzmlShadowMode {

  shadowMode?: CzmlShadowModeValue

  reference?: CzmlReferenceValue
}


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/StripeMaterial
 */
export interface CzmlStripeMaterial {
  orientation?: CzmlStripeOrientation

  evenColor?: CzmlColor

  oddColor?: CzmlColor

  offset?: CzmlDouble

  repeat?: CzmlDouble

}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/StripeOrientation
 */
export interface CzmlStripeOrientation extends CzmlInterpolatableProperty {

  stripeOrientation?: CzmlStripeOrientationValue

  reference?: CzmlReferenceValue
}


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/BoxDimensions
 */
export interface CzmlBoxDimensions extends CzmlInterpolatableProperty {

  cartesian?: CzmlCartesian3Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Label
 */
export interface CzmlLabel {
  show?: Boolean

  text?: CzmlString

  font?: CzmlFontValue

  style?: CzmlLabelStyle

  scale?: CzmlDouble

  showBackground?: Boolean

  backgroundColor?: CzmlColor

  backgroundPadding?: CzmlBackgroundPadding

  pixelOffset?: CzmlPixelOffset

  eyeOffset?: CzmlEyeOffset

  horizontalOrigin?: CzmlHorizontalOrigin

  verticalOrigin?: CzmlVerticalOrigin

  heightReference?: CzmlHeightReference

  fillColor?: CzmlColor

  outlineColor?: CzmlColor

  outlineWidth?: CzmlDouble

  translucencyByDistance?: CzmlNearFarScalar

  pixelOffsetScaleByDistance?: CzmlNearFarScalar

  scaleByDistance?: CzmlNearFarScalar

  distanceDisplayCondition?: CzmlDistanceDisplayCondition

  disableDepthTestDistance?: CzmlDouble

}


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Font
 */
export interface CzmlFont {

  font?: CzmlFontValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/LabelStyle
 */
export interface CzmlLabelStyle {

  labelStyle?: CzmlLabelStyleValue

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/BackgroundPadding
 */
export interface CzmlBackgroundPadding extends CzmlInterpolatableProperty {

  cartesian2?: CzmlCartesian2Value

  reference?: CzmlReferenceValue
}

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Point
 */
export interface CzmlPoint {

  show?: Boolean

  pixelSize?: CzmlDouble

  heightReference?: CzmlHeightReference

  color?: CzmlColor

  outlineColor?: CzmlColor

  outlineWidth?: CzmlDouble

  scaleByDistance?: CzmlNearFarScalar

  translucencyByDistance?: CzmlNearFarScalar

  distanceDisplayCondition?: CzmlDistanceDisplayCondition

  disableDepthTestDistance?: CzmlDouble
}

/**
 * Interval should indicate start and end according to:
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CZML-Structure#intervals
 *
 * Example:
 * "2012-04-30T12:00:00Z/13:00:00Z" means from noon to 1:00 PM UTC
 * "2012-04-30T13:00:00Z/14:00:00Z" means from 1:00 PM to 2:00 PM UTC
 *
 * The end of the first interval can be the same as the start of the second.
 */
export interface CzmlIntervalElement {
  interval: string,
  number: number
}



/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CartographicValue
 */
export type CzmlCartographicValue = any[]

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Cartesian3Value
 */
export type CzmlCartesian3Value = any[]

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Cartesian2Value
 */
export type CzmlCartesian2Value = any[]

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Cartesian3VelocityValue
 */
export type CzmlCartesian3VelocityValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ReferenceValue
 */
export type CzmlReferenceValue = string;


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/UnitQuaternionValue
 */
export type CzmlUnitQuaternionValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Time
 */
export type CzmlTime = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ClockRange
 */
export type CzmlClockRange = 'UNBOUNDED' | 'CLAMPED' | 'LOOP_STOP';

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ClockStep
 */
export type CzmlClockStep = 'TICK_DEPENDENT' | 'SYSTEM_CLOCK_MULTIPLIER' | 'SYSTEM_CLOCK';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/TimeIntervalCollection
 *
 * also read 'availability' here:
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet
 */
export type CzmlTimeIntervalCollection = string | string[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/BoundingRectangleValue
 */
export type CzmlBoundingRectangleValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/UnitCartesian3Value
 */
export type CzmlUnitCartesian3Value = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/SphericalValue
 */
export type CzmlSphericalValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/UnitSphericalValue
 */
export type CzmlUnitSphericalValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/RgbaValue
 */
export type CzmlRgbaValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/RgbafValue
 */
export type CzmlRgbafValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ColorBlendModeValue
 */
export type CzmlColorBlendModeValue = 'HIGHLIGHT' | 'REPLACE' | 'MIX';

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CornerTypeValue
 */
export type CzmlCornerTypeValue = 'ROUNDED' | 'MITERED' | 'BEVELED';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/HeightReferenceValue
 */
export type CzmlHeightReferenceValue = 'NONE' | 'CLAMP_TO_GROUND' | 'RELATIVE_TO_GROUND';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/HorizontalOriginValue
 */
export type CzmlHorizontalOriginValue = 'LEFT' | 'CENTER' | 'RIGHT';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/LabelStyleValue
 */
export type CzmlLabelStyleValue = 'FILL' | 'OUTLINE' | 'FILL_AND_OUTLINE';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/DoubleValue
 */
export type CzmlDoubleValue = number | any[];


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/NearFarScalarValue
 */
export type CzmlNearFarScalarValue = any[];


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/ShadowModeValue
 */
export type CzmlShadowModeValue = 'DISABLED' | 'ENABLED' | 'CAST_ONLY' | 'CAST_ONLY';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/StripeOrientationValue
 */
export type CzmlStripeOrientationValue = 'HORIZONTAL' | 'VERTICAL';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/CartographicRectangleValue
 */
export type CzmlCartographicRectangleValue = any[];


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/UriValue
 */
export type CzmlUriValue = string;


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/VerticalOriginValue
 */
export type CzmlVerticalOriginValue = 'BASELINE' | 'BOTTOM' | 'CENTER' | 'TOP';


/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/DistanceDisplayConditionValue
 */
export type CzmlDistanceDisplayConditionValue = any[];

/**
 * https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/FontValue
 */
export type CzmlFontValue = string;
