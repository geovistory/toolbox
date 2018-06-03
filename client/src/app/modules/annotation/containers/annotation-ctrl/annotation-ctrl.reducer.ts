import { AnnotationCtrlState } from "../../annotation.models";
import { AnnotationCtrlActions, AnnotationCtrlAction } from "./annotation-ctrl.actions";


const INITIAL_STATE: AnnotationCtrlState = {

};

export const annotationCtrlReducer =
    (lastState: AnnotationCtrlState = INITIAL_STATE, action: AnnotationCtrlAction): AnnotationCtrlState => {

        switch (action.type) {
            case AnnotationCtrlActions.ANNOTATION_CTRL_NEXT:
                lastState = {
                    ...lastState,
                    selectingSegment: false,
                    selectingEntities: true
                }
                break;
        }


        return lastState;
    };

