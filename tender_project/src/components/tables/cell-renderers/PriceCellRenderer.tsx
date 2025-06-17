import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

import styles from "./PriceCellRenderer.module.css";

export const PriceCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
}) => (
  <div className={styles.price}>
    <span className={styles.priceAmount}>{value}</span>
  </div>
);