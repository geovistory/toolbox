import { DatState } from './dat/dat.models'
import { DfhState } from './dfh/dfh.models'
import { InfState } from './inf/inf.models'
import { PendingState } from './pending/pending.model'
import { ProState } from './pro/pro.models'
import { ResolvedState } from './resolved/resolved.model'
import { SysState } from './sys/sys.models'
import { TabState } from './tab/tab.models'
import { WarState } from './war/war.models'

export interface DataState {
  sys?: SysState
  dfh?: DfhState
  inf?: InfState
  dat?: DatState
  pro?: ProState
  war?: WarState
  tab?: TabState
  pending?: PendingState
  resolved?: ResolvedState
}
