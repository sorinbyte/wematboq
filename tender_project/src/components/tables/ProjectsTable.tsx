"use client";

import type {
  ColDef,
  GetDetailRowDataParams,
  ValueFormatterFunc,
} from "ag-grid-community";

import {
  AllEnterpriseModule,
  ModuleRegistry,
  LicenseManager,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import {
  type ChangeEvent,
  type FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import styles from "./ProjectsTable.module.css";
import { getData } from "./projectdata";
import { ActionsCellRenderer } from "./cell-renderers/ActionsCellRenderer";
import { PriceCellRenderer } from "./cell-renderers/PriceCellRenderer";
import { ProductCellRenderer } from "./cell-renderers/ProductCellRenderer";
import { StatusCellRenderer } from "./cell-renderers/StatusCellRenderer";

LicenseManager.setLicenseKey(
  "[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-087409}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{30 June 2025}____[v3]_[0102]_MTc1MTIzODAwMDAwMA==e234b19b68957c055f5bc88abec0f85f"
);

ModuleRegistry.registerModules([AllEnterpriseModule]);

interface Props {
  gridTheme?: string;
  isDarkMode?: boolean;
}

const paginationPageSizeSelector = [5, 10, 20];

const statuses = {
  all: "Toate",
  active: "În licitație",
  paused: "Draft",
  outOfStock: "Închis",
};

const statusFormatter: ValueFormatterFunc = ({ value }) =>
  statuses[value as keyof typeof statuses] ?? "";

export const ProjectsTable: FunctionComponent<Props> = ({
  gridTheme = "ag-theme-quartz",
  isDarkMode,
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const [colDefs] = useState<ColDef[]>([
    {
      field: "projectname",
      headerName: "Nume Proiect",
      cellRenderer: "agGroupCellRenderer",
      headerClass: "header-projectname",
      cellRendererParams: {
        innerRenderer: ProductCellRenderer,
      },
      minWidth: 300,
    },
    {
      field: "client",
      headerName: "Client",
      minWidth: 200,
      cellClass: "verticalCenterCell",
    },
    { field: "added", headerName: "Adăugat", width: 150 },
    {
      field: "status",
      valueFormatter: statusFormatter,
      cellRenderer: StatusCellRenderer,
      filter: true,
      filterParams: {
        valueFormatter: statusFormatter,
      },
      headerClass: "header-status",
      minWidth: 160,
    },
    {
      field: "projectvalue",
      headerName: "Valoare",
      editable: false,
      minWidth: 160,
    },
    {
      field: "projectstart",
      headerName: "Start",
      width: 120,
      headerClass: "header-projectstart",
      cellRenderer: PriceCellRenderer,
    },
    {
      field: "biddingstart",
      headerName: "Start licitație",
      headerClass: "header-biddingstart",
      minWidth: 150,
    },
    {
      field: "biddingend",
      headerName: "Final licitație",
      headerClass: "header-biddingend",
      minWidth: 150,
    },
    {
      field: "actions",
      cellRenderer: ActionsCellRenderer,
      minWidth: 200,
      cellStyle: { whiteSpace: "nowrap" },
    },
  ]);

  const [rowData, setRowData] = useState<any[]>([]);
  useEffect(() => {
    const data = getData();
    setRowData(data);
  }, []);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      resizable: false,
      cellStyle: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    }),
    []
  );

  const themeClass = isDarkMode ? `${gridTheme}-dark` : gridTheme;
  const [quickFilterText, setQuickFilterText] = useState<string>();
  const onFilterTextBoxChanged = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
      setQuickFilterText(value),
    []
  );

  const detailCellRendererParams = useMemo(
    () => ({
      detailGridOptions: {
        columnDefs: [
          { field: "packagename", headerName: "Nume Pachet", flex: 1.5 },
          { field: "created", headerName: "Creat", flex: 1 },
          { field: "author", headerName: "Autor", flex: 1 },
          { field: "status", headerName: "Status", flex: 1 },
        ],
        headerHeight: 38,
      },
      getDetailRowData: ({ successCallback, data }: GetDetailRowDataParams) => {
        if (data?.variantDetails) {
          successCallback(data.variantDetails);
        }
      },
    }),
    []
  );

  const [activeTab, setActiveTab] = useState("all");
  const handleTabClick = useCallback((status: string) => {
    setActiveTab(status);
    const api = gridRef.current?.api;
    if (!api) return;
    if (status === "all") {
      api.setFilterModel(null);
    } else {
      api.setFilterModel({ status: { type: "set", values: [status] } });
    }
    api.onFilterChanged();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.exampleHeader}>
          <div className={styles.tabs}>
            {Object.entries(statuses).map(([key, displayValue]) => (
              <button
                className={`${styles.tabButton} ${
                  activeTab === key ? styles.active : ""
                }`}
                onClick={() => handleTabClick(key)}
                key={key}
              >
                {displayValue}
              </button>
            ))}
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="filter-text-box"
              placeholder="Caută proiecte..."
              onInput={onFilterTextBoxChanged}
            />
          </div>
        </div>
        <div
          className={`${themeClass} ${styles.grid}`}
          style={{ width: "100%", height: "600px", overflow: "auto" }}
        >
          <AgGridReact
            theme="legacy"
            ref={gridRef}
            columnDefs={colDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            rowHeight={80}
            pagination
            paginationPageSize={10}
            paginationPageSizeSelector={paginationPageSizeSelector}
            masterDetail
            detailCellRendererParams={detailCellRendererParams}
            quickFilterText={quickFilterText}
            detailRowAutoHeight
          />
        </div>
      </div>
    </div>
  );
};
