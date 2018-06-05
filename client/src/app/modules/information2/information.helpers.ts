import { RoleSet, RoleDetail } from "./information.models";

export function roleSetKey(roleSet: RoleSet) {
    return '_' + roleSet.property.dfh_pk_property + '_' + (roleSet.isOutgoing ? 'outgoing' : 'ingoing')
}


export function roleDetailKey(roleDetail: RoleDetail) { return  '_' + roleDetail.role.pk_entity };
