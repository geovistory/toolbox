import { AnnotationCtrlState } from "../../annotation.models";
import { FluxStandardAction } from "flux-standard-action";
import { Injectable } from "@angular/core";
import { dispatch } from "@angular-redux/store";

// replace AnnotationPanel with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = AnnotationCtrlState;
export type AnnotationCtrlAction = FluxStandardAction<Payload, any>;

@Injectable()
export class AnnotationCtrlActions {
    static readonly ANNOTATION_CTRL_NEXT = 'ANNOTATION_CTRL_NEXT';

    @dispatch()


    next = (): AnnotationCtrlAction => ({
        type: AnnotationCtrlActions.ANNOTATION_CTRL_NEXT,
        meta: null,
        payload: null
    })


}
