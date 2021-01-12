import {createInfLanguage} from '../atomic/inf-language.helper';
import {createWarEntityPreview} from '../atomic/war-entity-preview.helper';
import {createWarStatement} from '../atomic/war-statement.helper';
import {InfLanguageMock} from '../data/gvDB/InfLanguageMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {WarEntityPreviewMock} from '../data/gvDB/WarEntityPreviewMock';
import {WarStatementMock} from '../data/gvDB/WarStatementMock';
import {addAccountToProject, createAccountVerified} from '../generic/account.helper';
import {createProject1} from './project.helper';

export async function forAnalysis() {
    const accountId = await createAccountVerified('gaetan.muck@kleiolab.ch', 'testtest1');
    await createInfLanguage(InfLanguageMock.GERMAN)
    await createProject1()
    const pkProject = ProProjectMock.PROJECT_1.pk_entity ?? -1
    await addAccountToProject(accountId, pkProject)


    await createWarEntityPreview(WarEntityPreviewMock.GEO_PLACE_BASEL)
    await createWarEntityPreview(WarEntityPreviewMock.GEO_PLACE_ZURICH)

    await createWarEntityPreview(WarEntityPreviewMock.BIRTH_ZWINGLI)
    await createWarEntityPreview(WarEntityPreviewMock.BIRTH_OEKOLOMBAD)

    await createWarStatement(WarStatementMock.BIRTH_OF_ZWINGLI_TOOK_PLACE_IN)
    await createWarStatement(WarStatementMock.BIRTH_OF_OEKOLOMBAD_TOOK_PLACE_IN)

    return {accountId, pkProject}
}

