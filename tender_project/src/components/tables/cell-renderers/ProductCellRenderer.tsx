import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";
import Link from "next/link";
import styles from "./ProductCellRenderer.module.css";

export const ProductCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
  data: { image, category, id }, // make sure `id` is passed in each row
}) => (
  <div className={styles.productCell}>
    <div className={styles.image}>
      <img src={`/example/inventory/${image}.png`} alt={image} />
    </div>
    <div>
      <Link href={`/admin/proiecte/${id}`} className={styles.projectLink}>
        {value}
      </Link>
      <div className={styles.stockCell}>{category}</div>
    </div>
  </div>
);