import { model, property } from "@loopback/repository"
import { GvNegativeSchemaObject } from "./gv-negative-schema-object.model"
import { GvPositiveSchemaObject } from "./gv-positive-schema-object.model"

@model()
export class GvSchemaModifier {
    @property() positive: GvPositiveSchemaObject;
    @property() negative: GvNegativeSchemaObject
}
