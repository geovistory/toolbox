import { InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';

export const mockGeoreference: InfResourceWithRelations = {
  outgoing_statements: [
    {
      fk_property: 148,
      object_place: {
        fk_class: 51,
        lat: 234,
        long: 23423,
      },
    }
  ],
  fk_class: 84,
}
