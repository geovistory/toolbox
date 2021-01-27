import { ProjectDetail } from 'app/core/active-project/active-project.models';

export namespace ProjectDetailMock {
  export const project1: ProjectDetail = {
    pk_project: 100,
    default_language: {
      notes: 'English',
      iso6391: 'en ',
      iso6392b: 'eng',
      iso6392t: 'eng',
      pk_entity: 18889,
      pk_language: 'eng',
      fk_class: 54,
      lang_type: '',
      scope: ''
    }
  }
}
