'use strict';

import {
  ExtensionContext,
  commands,
  workspace,
} from 'vscode';
import { saveWithoutSorting, sortImports } from './sort';

import { updateSaveRegistration } from './registration';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(commands.registerCommand('phpSortImports.sort', sortImports));
  context.subscriptions.push(commands.registerCommand('phpSortImports.saveWithoutSorting', saveWithoutSorting));
  
  updateSaveRegistration();
  workspace.onDidChangeConfiguration(updateSaveRegistration);
}

export function deactivate() { }