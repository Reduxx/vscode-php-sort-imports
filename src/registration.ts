import { Disposable, workspace } from 'vscode';

import { sortImportsOnSave } from './sort';

let saveRegistration : Disposable;

export function unregisterWillSaveTextDocument() {
  if (!saveRegistration) {
    return;
  }

  saveRegistration.dispose();
  saveRegistration = null;
}

export function registerWillSaveTextDocument() {
  if (saveRegistration) {
    return;
  }

  saveRegistration = workspace.onWillSaveTextDocument(sortImportsOnSave);
}

export function getOnSaveSetting() {
  return workspace.getConfiguration("phpSortImports").get("onSave");
}

export function getSortingSetting() {
  return workspace.getConfiguration("phpSortImports").get("sorting");
}

export function getLanguagesSetting(): string[] {
  return workspace.getConfiguration("phpSortImports").get<string[]>("languages");
}

export function updateSaveRegistration() {
  if (getOnSaveSetting()) {
    registerWillSaveTextDocument();
  } else {
    unregisterWillSaveTextDocument();
  }
}