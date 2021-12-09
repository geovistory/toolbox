import { InfResource } from '@kleiolab/lib-sdk-lb4';

export const mockGeoreference: InfResource = {
  outgoing_statements: [
    {
      fk_property: 148,
      object_place: {
        fk_class: 51,
        lat: 234,
        long: 23423,
        ...{} as any
      },
      ...{} as any
    }
  ],
  fk_class: 84,
  ...{} as any
}
