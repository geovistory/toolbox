import {model, property} from '@loopback/repository';

@model()
/**
 * Define a Geovistory project (projectId) that has the exclusive permission to
 * add, edit and delete instances of subclasses of the specified class
 * (parentOrAncestorClassId).
 */
export class SysConfigPlatformVocabulary {

  // Id of the project that has the exclusive permission to
  // add, edit and delete instances of subclasses of the specified class
  // (parentOrAncestorClassId).
  @property({required: true})
  projectId: number;

  // Id of the class, that acts as parent or ancestor class of
  // classes that can only be edited by the specified project (projectId)
  @property({required: true})
  parentOrAncestorClassId: number;

}
