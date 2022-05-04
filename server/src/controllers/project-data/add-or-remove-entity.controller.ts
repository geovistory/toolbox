import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {post, tags} from '@loopback/openapi-v3';
import {param} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Roles} from '../../components/authorization';
import {QRelateIdsToProject} from '../../components/query/q-entity-add-to-project';
import {QEntityRemoveFromProject} from '../../components/query/q-entity-remove-from-project';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';
import {C_365_APPELLATION_IN_A_LANGUAGE_ID, C_785_TEXT_ID, P_1111_IS_APPELLATION_FOR_LANGUAGE_OF_ID, P_1864_HAS_VALUE_VERSION_ID} from '../../ontome-ids';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';
import {DfhPropertyController} from '../data-model/dfh-property.controller';
interface Prop {
  pk_property: number
  has_domain: number
  has_range: number
  domain_instances_max_quantifier: number
  range_instances_max_quantifier: number
}
interface Stmt {
  pk_entity: number;
  fk_source: number;
  fk_target: number;
  target_class: number;
  target_super_classes: number[];
}

@tags('project data')
export class AddOrRemoveEntityController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,
    @inject('controllers.DfhPropertyController')
    public dfhPropertyController: DfhPropertyController,
  ) { }



  @post('project-data/add-entity', {
    responses: {
      '200': {
        description: 'Add entity and some of its statements',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async addEntityToProject(
    @param.query.number('pkProject', {required: true}) pkProject: number,
    @param.query.number('pkEntity', {required: true}) pkEntity: number,
  ): Promise<GvPositiveSchemaObject> {

    const ids = await this.getIdsToAdd(pkProject, pkEntity);

    // get instances of Table get its value

    // get incoming has appellation statements
    //  ids.push(...(await this.getOutgoingStatementsToAdd(pkEntity, pkProject)))

    // get the outgoing statements of the appellation in language TeEn

    return new QRelateIdsToProject(this.datasource).query(pkProject, ids, parseInt(this.user[securityId]))
  }

  async getIdsToAdd(pkProject: number, pkEntity: number): Promise<number[]> {
    const recursiveFn = async (props: Prop[], ids: number[]) => {
      const stmts: Stmt[] = [];
      for (const id of ids) {
        const x = await this.getOutgoingStatementsToAdd(props, id);
        stmts.push(...x);

        // add statement ids to ids
        ids.push(...x.map(s => s.pk_entity));
      }


      // select the incoming properties to add
      const incomingProps = props.filter(p => p.pk_property === P_1111_IS_APPELLATION_FOR_LANGUAGE_OF_ID)

      for (const id of ids) {
        const x = await this.getIncomingStatementsToAdd(incomingProps, id);
        stmts.push(...x);

        // add statement ids to ids
        ids.push(...x.map(s => s.pk_entity));
      }

      const targetEntitiesToAdd: number[] = []

      // get instances of Text (sub-)classes
      targetEntitiesToAdd.push(...(await this.getStmtsPointingToClass(stmts, C_785_TEXT_ID)));

      // get instances of Appellation in a languange (sub-)classes
      targetEntitiesToAdd.push(...(await this.getStmtsPointingToClass(stmts, C_365_APPELLATION_IN_A_LANGUAGE_ID)));

      if (targetEntitiesToAdd.length) {
        // add target entity ids
        const childIds = await recursiveFn(props, targetEntitiesToAdd);

        for (const childId of childIds) {
          // make sure, to not add an id more than once
          if (ids.indexOf(childId) === -1) {
            ids.push(childId);
          }
        }
      }

      return ids;
    };

    // get properties of project
    const propsOfProject: Prop[] = await this.getOutgoingProps(pkProject);

    // make sure the range max quantifier of has value version is one,
    // so that we add only one version to the project
    propsOfProject.forEach(p => {
      if (p.pk_property === P_1864_HAS_VALUE_VERSION_ID) p.range_instances_max_quantifier = 1
    })

    const ids = [pkEntity];

    await recursiveFn(propsOfProject, ids);
    return ids;
  }

  private async getOutgoingProps(pkProject: number) {
    const res = await this.dfhPropertyController.ofProject(pkProject);
    const propsOfProject: Prop[] = (res.positive.dfh?.property ?? []).map(p => {
      return {
        pk_property: p.pk_property ?? -1,
        has_domain: p.has_domain ?? -1,
        has_range: p.has_range ?? -1,
        range_instances_max_quantifier: p.range_instances_max_quantifier ?? -1,
        domain_instances_max_quantifier: p.domain_instances_max_quantifier ?? -1
      };
    });
    return propsOfProject;
  }

  private async getOutgoingStatementsToAdd(propsOfProject: Prop[], pkEntity: number) {
    const s = new SqlBuilderLb4Models(this.datasource);
    s.sql = `
    SELECT *
    FROM gv_get_outgoing_statements_to_add(
      ${s.addParam(JSON.stringify(propsOfProject))},
      ${s.addParam(pkEntity)}
    ) t1
    `;
    const ids = await s.execute<Stmt[]>();
    return ids
  }

  private async getIncomingStatementsToAdd(props: Prop[], pkEntity: number) {
    const s = new SqlBuilderLb4Models(this.datasource);
    s.sql = `
    SELECT *
    FROM gv_get_incoming_statements_to_add(
      ${s.addParam(JSON.stringify(props))},
      ${s.addParam(pkEntity)}
    ) t1
    `;
    const ids = await s.execute<Stmt[]>();
    return ids
  }
  async getStmtsPointingToClass(stmts: Stmt[], classId: number): Promise<number[]> {
    // get statements pointing to a (sub-)class of classId
    const stmtsToText = stmts
      .filter(s => [
        s.target_class,
        ...s.target_super_classes
      ].includes(classId));

    // return text ids
    return stmtsToText.map(s => s.fk_target)
  }



  @post('project-data/remove-entity', {
    responses: {
      '200': {
        description: 'Remove entitiy and some of its statements',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async removeEntityFromProject(
    @param.query.number('pkProject', {required: true}) pkProject: number,
    @param.query.number('pkEntity', {required: true}) pkEntity: number,
  ): Promise<GvPositiveSchemaObject> {
    return new QEntityRemoveFromProject(this.datasource).query(pkProject, pkEntity, parseInt(this.user[securityId]))
  }
}


