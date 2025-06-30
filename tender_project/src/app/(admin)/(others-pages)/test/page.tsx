'use client';

import { useState } from 'react';
import {
  AgGridReact,
  AgGridReactProps,
} from 'ag-grid-react';
import {
  ModuleRegistry,
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey(
  "[TRIAL]this{AG_Charts_and_AG_Grid}Enterprise_key{AG-088974}is_granted_for_evaluation_only_Use_in_production_is_not_permitted_Please_report_misuse_to_legal@ag-grid.com_For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com_You_are_granted_a{Single_Application}Developer_License_for_one_application_only_All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed_This_key_will_deactivate_on{14 July 2025}_[v3][0102]_MTc1MjQ0NzYwMDAwMA==3c6193179b095f35a764fb60cf98961e"
);

// Import all CSS themes (required)
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-material.css';

ModuleRegistry.registerModules([AllEnterpriseModule]);

const themes = [
  { id: 'themeQuartz', theme: themeQuartz },
  { id: 'themeBalham', theme: themeBalham },
  { id: 'themeMaterial', theme: themeMaterial },
  { id: 'themeAlpine', theme: themeAlpine },
];

export default function TestPage() {
  const [theme, setTheme] = useState(themes[0]);

  const rowData = Array.from({ length: 10 }, (_, i) => [
    { make: 'Toyota', model: 'Celica', price: 35000 + i * 1000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 + i * 1000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 + i * 1000 },
  ]).flat();

  const columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ];

  const defaultColDef: AgGridReactProps['defaultColDef'] = {
    editable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
    sortable: true,
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">AG Grid Theme Switcher</h1>

      <div className="mb-4">
        <label className="mr-2">Select Theme:</label>
        <select
          className="border px-2 py-1 rounded"
          value={theme.id}
          onChange={(e) => {
            const selected = themes.find((t) => t.id === e.target.value);
            if (selected) setTheme(selected);
          }}
        >
          {themes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.id}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`ag-theme-${theme.id.replace('theme', '').toLowerCase()}`}
        style={{ height: 600, width: '100%' }}
      >
        <AgGridReact
          theme={theme.theme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={true}
        />
      </div>
    </div>
  );
}