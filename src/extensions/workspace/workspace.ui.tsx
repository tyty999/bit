import React from 'react';
import { Slot } from '@teambit/harmony';
import { RouteProps } from 'react-router-dom';
import { Workspace } from './ui';
import { RouteSlot } from '../react-router/slot-router';
import { UIRoot } from '../ui/ui-root.ui';
import { UIRuntimeExtension } from '../ui/ui.ui';

export type MenuItem = {
  label: JSX.Element | string | null;
};

export class WorkspaceUI {
  constructor(
    /**
     * route slot.
     */
    private routeSlot: RouteSlot
  ) {}

  /**
   * register a route to the workspace.
   */
  registerRoute(route: RouteProps) {
    this.routeSlot.register(route);
    return this;
  }

  get root(): UIRoot {
    return {
      component: <Workspace routeSlot={this.routeSlot} />,
    };
  }

  static dependencies = [UIRuntimeExtension];

  // TODO: @gilad we must automate this.
  static id = '@teambit/workspace';

  static slots = [Slot.withType<RouteProps>()];

  static async provider([ui]: [UIRuntimeExtension], config, [routeSlot]: [RouteSlot]) {
    const workspaceUI = new WorkspaceUI(routeSlot);
    ui.registerRoot(workspaceUI.root);

    return workspaceUI;
  }
}
