import styles from "./Dividers.module.scss";

interface HorizontalDividerProps {
  margin: string;
}

export const HorizontalDivider = ({ margin }: HorizontalDividerProps) => {
  return (
    <span className={styles.horizontalDivider} style={{ margin: margin }} />
  );
};

interface VerticalDividerProps {
  top: string;
  left: string;
  height?: string;
  minHeight?: string;
}

export const VerticalDivider = ({
  top,
  left,
  height,
  minHeight,
}: VerticalDividerProps) => {
  return (
    <span
      className={styles.verticalDivider}
      style={{ top: top, left: left, height: height, minHeight: minHeight }}
    />
  );
};
