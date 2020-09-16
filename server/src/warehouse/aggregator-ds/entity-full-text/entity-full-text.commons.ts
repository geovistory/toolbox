
// Outgoing Properties not included in full text
const hiddenOut: {[key: string]: true} = {
  71: true, 72: true, 150: true, 151: true, 152: true, 153: true, // time span to time primitive
  1016: true, // F4 Manifestation Singleton → R42 is representative manifestation singleton for (has representative manifestation singleton) → F2 Expression
  1218: true, // E73 Information Object → P2 mentions → E1 CRM Entity  (Quantifiers 0,n:0,n)
  1334: true, // C1 [Geovistory] Digital → P9 refers to (is referred to by) → E1 CRM Entity
}

// Ingoing Properties not included in full text
const hiddenIn: {[key: string]: true} = {
  1316: true, // F2 Expression → P5 carrier provided by → F5 Item
  979: true, // F2 Expression → R4 carriers provided by (comprises carriers of) → F3 Manifestation Product Type
  1305: true, // F2 Expression → P4 is server response to request → C4 Web Request
  1218: true, // E73 Information Object → P2 mentions → E1 CRM Entity  (Quantifiers 0,n:0,n)
  1334: true, // C1 [Geovistory] Digital → P9 refers to (is referred to by) → E1 CRM Entity
}

export function isHiddenOutgoingProperty(pkProperty: string): boolean {
  return hiddenOut[pkProperty] === true
}

export function isHiddenIngoingProperty(pkProperty: string): boolean {
  return hiddenIn[pkProperty] === true
}
