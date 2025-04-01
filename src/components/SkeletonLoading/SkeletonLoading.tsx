import styles from "./SkeletonLoading.module.scss";

interface SkeletonLoadingProps {
  height: number;
}

export const SkeletonLoading = ({ height }: SkeletonLoadingProps) => {
  return (
    <div className={styles.skeletonLoading} style={{ height: height }}></div>
  );
};
