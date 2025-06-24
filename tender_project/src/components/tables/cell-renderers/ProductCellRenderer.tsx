import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";
import Link from "next/link";
import styles from "./ProductCellRenderer.module.css";

export const ProductCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  data: { image, category, id },
}) => (
  <div className={styles.productCell}>
    <div className={styles.image}>
      <img src={`/example/inventory/${image}.png`} alt={image} />
    </div>
    <div>
      <Link href={`/projects/${id}`} className={styles.projectLink}>
        {value}
      </Link>
      <div className={styles.stockCell}>{category}</div>
    </div>
  </div>
);