import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {IsolationLevel} from '@loopback/repository';
import {HttpErrors, post, requestBody, tags} from '@loopback/rest';
import {isNumber} from 'lodash';
import {Transaction} from "loopback-datasource-juggler/types/transaction-mixin";
import {Roles} from '../../components/authorization/keys';
import {Postgres1DataSource} from '../../datasources';
import {ChangeOrdNumReq} from '../../models/field/change-ord-num-req';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';

@tags('project data')
export class OrdNumController {
  mergeReqsBySourceInSql = true
  mergeReqsByTargetInSql = false
  joinNestedInSql = false

  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }

  @post('subfield-page/change-order', {
    responses: {
      '200': {
        description: "Request to change move a statements position in a field.",
      },
      '403': {
        description: "Forbidden.",
      }
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async changeOrder(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: {
              'x-ts-type': ChangeOrdNumReq,
            }
          }
        },
      }
    ) req: ChangeOrdNumReq,
  ): Promise<void> {


    if (req.fieldId.scope.inProject !== req.pkProject) throw new HttpErrors.Forbidden('The given field scope is not of the same project as given pkProject.')
    if (req.targetOrdNum > 200) throw new HttpErrors.Forbidden('The target ordNum must not be higher than 200.')
    if (req.targetOrdNum < 1) throw new HttpErrors.Forbidden('The target ordNum has to be 1 or higher.')

    const transaction = await this.datasource.beginTransaction(IsolationLevel.READ_COMMITTED);
    const ordNumCol = req.fieldId.isOutgoing ? 'ord_num_of_range' : 'ord_num_of_domain';
    try {
      /**
       * ensure all statements have a ord num until target position
       */
      await this.setOrdNumsUntilTargetPos(req, ordNumCol, transaction);
      /**
       * get current position of statement within the target field
       */
      const {sourceOrdNum} = await this.getStatementPositionInTargetField(ordNumCol, req, transaction);

      if (sourceOrdNum !== req.targetOrdNum) {


        await this.updateOrdNumOfOtherStatements(req, sourceOrdNum, ordNumCol, transaction);

        /**
        * Update this statements positions
        */
        const q4 = new SqlBuilderLb4Models(this.datasource);
        q4.sql = `
          -- update the ord num of the moved statement
          UPDATE projects.info_proj_rel
          SET ${ordNumCol} = ${q4.addParam(req.targetOrdNum)}
          WHERE fk_entity = ${q4.addParam(req.movedStatementId)}
          AND fk_project = ${q4.addParam(req.pkProject)};
          `
        await q4.execute<number>({transaction});
      }

    } catch (error) {
      await transaction.rollback()
      throw new HttpErrors.InternalServerError('Error when changing order of statment in field')
    }

    await transaction.commit()
    return;


  }

  /**
   * Updates the position of all statements between source and target ord num
   * @param req
   * @param sourceOrdNum
   * @param ordNumCol
   * @param transaction
   */
  private async updateOrdNumOfOtherStatements(req: ChangeOrdNumReq, sourceOrdNum: number | undefined, ordNumCol: string, transaction: Transaction) {
    const q3 = new SqlBuilderLb4Models(this.datasource);
    const statementFilter2 = q3.createStatementFilterObject(req.fieldId.isOutgoing, req.fieldId.source, req.fieldId.property);

    /**
    * Update all other positions
    */
    if (!sourceOrdNum || (sourceOrdNum > req.targetOrdNum)) {
      q3.sql = `
        -- if no source ord num or
        -- source ord num > target ord num,
        -- increase all where ord num >= source and < target and not null

        UPDATE projects.info_proj_rel t1
        SET ${ordNumCol} = ${ordNumCol} + 1
        FROM (
          SELECT 	t2.pk_entity as pk_proj_rel
          FROM information.statement t1,
          projects.info_proj_rel t2
          WHERE ${q3.getStatementWhereFilter('t1', statementFilter2).join(' AND ')}
          AND t1.pk_entity = t2.fk_entity
          AND t2.fk_project = ${q3.addParam(req.pkProject)}
          AND t2.is_in_project = true
          AND ${ordNumCol} >= ${q3.addParam(req.targetOrdNum)}
          ${isNumber(sourceOrdNum) ? `
          AND ${ordNumCol} < ${q3.addParam(sourceOrdNum ?? 0)}
          ` : ''}

        ) as t2
        WHERE t2.pk_proj_rel = t1.pk_entity;
          `;
      await q3.execute<number>({transaction});
    }
    else if (sourceOrdNum < req.targetOrdNum) {
      q3.sql = `
        -- if source ord num < target ord num,
        -- decrase all where ord num <= source and > target

        UPDATE projects.info_proj_rel t1
        SET ${ordNumCol} = ${ordNumCol} - 1
        FROM (
          SELECT 	t2.pk_entity as pk_proj_rel
          FROM information.statement t1,
          projects.info_proj_rel t2
          WHERE ${q3.getStatementWhereFilter('t1', statementFilter2).join(' AND ')}
          AND t1.pk_entity = t2.fk_entity
          AND t2.fk_project = ${q3.addParam(req.pkProject)}
          AND t2.is_in_project = true
          AND ${ordNumCol} > ${q3.addParam(sourceOrdNum)}
          AND ${ordNumCol} <= ${q3.addParam(req.targetOrdNum)}
        ) as t2
        WHERE t2.pk_proj_rel = t1.pk_entity;
          `;
      await q3.execute<number>({transaction});
    }
    else {
      // No need to move, since moving to current position.
    }
  }

  private async getStatementPositionInTargetField(ordNumCol: string, req: ChangeOrdNumReq, transaction: Transaction): Promise<{
    notInTargetField?: boolean;
    sourceOrdNum?: number;
  }> {
    const q2 = new SqlBuilderLb4Models(this.datasource);
    q2.sql = `
        SELECT 	${ordNumCol} as "sourceOrdNum"
        FROM information.statement t1,
        projects.info_proj_rel t2
        WHERE t1.pk_entity = t2.fk_entity
        AND t1.pk_entity = ${q2.addParam(req.movedStatementId)}
        AND t2.fk_project = ${q2.addParam(req.pkProject)}
        AND t2.is_in_project = true

        `;
    const res = await q2.execute<{"sourceOrdNum": number;}[]>({transaction});
    const sourceOrdNum = res?.[0]?.sourceOrdNum;

    // if not found, then this statement is not yet in the target field
    if (res.length < 1) return {notInTargetField: true}

    // else, sourceOrdNum can be a number or null (if it was not yet set on db)
    return {sourceOrdNum};
  }

  private async setOrdNumsUntilTargetPos(req: ChangeOrdNumReq, ordNumCol: string, transaction: Transaction) {
    const q = new SqlBuilderLb4Models(this.datasource);
    const statementFilter = q.createStatementFilterObject(req.fieldId.isOutgoing, req.fieldId.source, req.fieldId.property);
    q.sql = `
      -- ensure all statements have a ord num until target position
      UPDATE projects.info_proj_rel t1
      SET ${ordNumCol} = t3.ROW_NUMBER
      FROM (
        -- order until target position
        SELECT
        t2.pk_entity as pk_proj_rel,
        t2.${ordNumCol},
        t1.pk_entity,
        ROW_NUMBER () OVER (ORDER BY t2.${ordNumCol} ASC ,	t1.pk_entity DESC)
        FROM information.statement t1,
        projects.info_proj_rel t2
        WHERE  ${q.getStatementWhereFilter('t1', statementFilter).join(' AND ')}
        AND t1.pk_entity = t2.fk_entity
        AND t2.fk_project = ${q.addParam(req.pkProject)}
        AND t2.is_in_project = true
        LIMIT ${q.addParam(req.targetOrdNum)}
        ) as t3
        WHERE t3.pk_proj_rel = t1.pk_entity
        AND  t3.ROW_NUMBER is distinct from t1.${ordNumCol};
        `;
    await q.execute({transaction});
    return q;
  }
}
