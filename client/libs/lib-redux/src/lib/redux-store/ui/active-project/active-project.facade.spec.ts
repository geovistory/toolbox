import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { IAppState } from '../../state.model';
import { ActiveProjectFacade } from './active-project.facade';
import { Panel } from './active-project.models';
import { ActiveProjectModule } from './active-project.module';

describe('ActiveProject Facade', () => {
  let facade: ActiveProjectFacade;
  let store: Store<IAppState>;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forRoot(),
        EffectsModule.forRoot(),
        ActiveProjectModule
      ]
    })
    class RootModule { }

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(ActiveProjectFacade);
    store = TestBed.inject(Store);
  });

  it('should init with focusedPanel 0 ', async () => {
    const res = await firstValueFrom(facade.focusedPanel$)
    expect(res).toBe(0)
  });
  it('should init with panels = [] ', async () => {
    const res = await firstValueFrom(facade.panels$)
    expect(res).toEqual([])
  });

  it('should reduce and select projectId ', async () => {
    facade.loadProjectBasiscsSucceded(123)
    const res = await firstValueFrom(facade.projectId$)
    expect(res).toBe(123)
  });

  it('should reduce and select panels ', async () => {
    const panel: Panel = {
      id: 11,
      tabs: [{ active: true, component: 'text', icon: 'text', }],
    }
    facade.setPanels([panel], 12, 13, 1)
    const res = await firstValueFrom(facade.panels$)
    expect(res).toEqual([panel])
    const res2 = await firstValueFrom(facade.focusedPanel$)
    expect(res2).toEqual(1)
  });


  it('should reduce and select list type ', async () => {
    facade.setListType('analysis')
    const res = await firstValueFrom(facade.listType$)
    expect(res).toEqual('analysis')
  });


  it('should reduce and select list type ', async () => {
    facade.setListType('analysis')
    const res = await firstValueFrom(facade.listType$)
    expect(res).toEqual('analysis')
  });
  it('should activate tab', async () => {
    // add panel with two tabs
    const panel: Panel = {
      id: 11,
      tabs: [
        { active: false, component: 'text', icon: 'text', },
        { active: true, component: 'table', icon: 'table', }
      ],
    }
    facade.setPanels([panel], 12, 13, 1)

    // check if second tab is active
    const res = await firstValueFrom(facade.getIsActiveTab$(0, 1))
    expect(res).toEqual(true)

    // activate first tab is active
    facade.setActiveTab(0, 0)

    // check if second tab is not active
    const res2 = await firstValueFrom(facade.getIsActiveTab$(0, 1))
    expect(res2).toEqual(false)
  });

  it('should move tab', async () => {
    // add panel with two tabs
    const panel1: Panel = {
      id: 11,
      tabs: [
        { active: false, component: 'text', icon: 'text', },
        { active: true, component: 'table', icon: 'table', }
      ],
    }
    const panel2: Panel = {
      id: 22,
      tabs: [
        { active: false, component: 'classes-settings', icon: 'settings', },
        { active: true, component: 'entity', icon: 'persistent-item', }
      ],
    }
    facade.setPanels([panel1, panel2], 12, 13, 1)

    // check in panel 0, component of tab 1
    const res = await firstValueFrom(facade.getTab$(0, 1))
    expect(res.component).toEqual('table')

    // move table tab from panel 0 to pabel 1, position 2
    facade.moveTab(0, 1, 1, 2)

    // check in panel 1, component of tab 2
    const res2 = await firstValueFrom(facade.getTab$(1, 2))
    expect(res2.component).toEqual('table')
  });

  it('should add tab', async () => {
    const focusedPanel = 1
    // add panel with two tabs
    const panel1: Panel = {
      id: 11,
      tabs: [
        { active: false, component: 'text', icon: 'text', },
        { active: true, component: 'table', icon: 'table', }
      ],
    }
    const panel2: Panel = {
      id: 22,
      tabs: [
        { active: false, component: 'classes-settings', icon: 'settings', },
        { active: true, component: 'entity', icon: 'persistent-item', }
      ],
    }
    facade.setPanels([panel1, panel2], 12, 13, focusedPanel)

    // add tab
    facade.addTab({ active: false, component: 'analysis', icon: 'analysis', })

    // check if analysis tab is appended to tabs in active panel
    const res2 = await firstValueFrom(facade.getTab$(focusedPanel, 2))
    expect(res2.component).toEqual('analysis')
  });

  it('should add tab and initialize a panel', async () => {
    // add tab
    facade.addTab({ active: false, component: 'analysis', icon: 'analysis', })

    // check if analysis tab is appended a new panel
    const res2 = await firstValueFrom(facade.getTab$(0, 0))
    expect(res2.component).toEqual('analysis')
  });

  it('should close tab', async () => {
    const panel: Panel = {
      id: 11,
      tabs: [
        { active: true, component: 'text', icon: 'text', },
        { active: true, component: 'text', icon: 'text', }
      ],
    }
    facade.setPanels([panel], 12, 13, 1)
    const res = await firstValueFrom(facade.panels$)
    expect(res[0].tabs.length).toEqual(2)
    facade.closeTab(0, 0)
    const res2 = await firstValueFrom(facade.panels$)
    expect(res2[0].tabs.length).toEqual(1)
  });
  it('should close empty panel', async () => {
    const panel: Panel = {
      id: 11,
      tabs: [{ active: true, component: 'text', icon: 'text', }],
    }
    facade.setPanels([panel], 12, 13, 0)
    const res = await firstValueFrom(facade.panels$)
    expect(res.length).toEqual(1)
    facade.closeTab(0, 0)
    const res2 = await firstValueFrom(facade.panels$)
    expect(res2.length).toEqual(0)
  });

  it('should close panel ', async () => {
    const panel: Panel = {
      id: 11,
      tabs: [{ active: true, component: 'text', icon: 'text', }],
    }
    facade.setPanels([panel], 12, 13, 1)
    const res = await firstValueFrom(facade.panels$)
    expect(res.length).toEqual(1)
    facade.closePanel(0)
    const res2 = await firstValueFrom(facade.panels$)
    expect(res2.length).toEqual(0)
  });

  it('should focus panel', async () => {
    facade.focusPanel(1)
    const res = await firstValueFrom(facade.focusedPanel$)
    expect(res).toBe(1)
  });

  it('should split panel', async () => {
    // add panel with two tabs
    const panel: Panel = {
      id: 11,
      tabs: [
        { active: false, component: 'text', icon: 'text', },
        { active: true, component: 'table', icon: 'table', }
      ],
    }
    facade.setPanels([panel], 12, 13, 0)
    // move table tab to the left
    facade.splitPanel(0, 1, 0)

    const res = await firstValueFrom(facade.panels$)
    expect(res.length).toBe(2)
    expect(res[0].tabs[0].component).toBe('table')
    expect(res[1].tabs[0].component).toBe('text')
  });

  it('should reduce and select refining chunk bool', async () => {
    facade.setRefiningChunk(true);
    const res = await firstValueFrom(facade.refiningChunk$)
    expect(res).toBe(true)
  })

  it('should reduce and select create mentioning bool', async () => {
    facade.setCreatingMentioning(true);
    const res = await firstValueFrom(facade.createMentioning$)
    expect(res).toBe(true)
  })

  it('should reduce and select mentionings focused in text', async () => {
    facade.setMentioningsFocusedInText([11, 22]);
    const res = await firstValueFrom(facade.mentioningsFocusedInText$)
    expect(res).toEqual([11, 22])
  })
  it('should reduce and select mentionings focused in table', async () => {
    facade.setMentioningsFocusedInTable([11, 22]);
    const res = await firstValueFrom(facade.mentioningsFocusedInTable$)
    expect(res).toEqual([11, 22])
  })
  it('should destroy (reset) state', async () => {
    facade.focusPanel(1)
    const res = await firstValueFrom(facade.focusedPanel$)
    expect(res).toBe(1)
    facade.destroy()
    const res2 = await firstValueFrom(facade.focusedPanel$)
    expect(res2).toBe(0)
  });

  it('should set reduce and select tab title', async () => {
    facade.setTabTitle('tab1', 'my-title')
    const res = await firstValueFrom(facade.getTabTitle('tab1'))
    expect(res).toBe('my-title')
  });

  it('should set reduce and select tab tooltip', async () => {
    facade.setTabTooltip('tab1', 'my-tooltip')
    const res = await firstValueFrom(facade.getTabTooltip('tab1'))
    expect(res).toBe('my-tooltip')
  });

  it('should set reduce and select tab loading', async () => {
    facade.setTabLoading('tab1', true)
    const res = await firstValueFrom(facade.getTabLoading('tab1'))
    expect(res).toBe(true)
  });

  it('should set reduce and select tab layout mode', async () => {
    facade.setTabLayoutMode('tab1', 'left-only')
    const res = await firstValueFrom(facade.getTabLayoutMode('tab1'))
    expect(res).toBe('left-only')
  });

  it('should set reduce and select changing class proj rel', async () => {
    facade.setChangingClassProjRel(123, true)
    facade.setChangingClassProjRel(456, false)
    const res = await firstValueFrom(facade.getChangingClassProjRel(123))
    expect(res).toBe(true)
    const res2 = await firstValueFrom(facade.getChangingClassProjRel(456))
    expect(res2).toBe(false)
  });


})
