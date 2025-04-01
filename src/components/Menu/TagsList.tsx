import styles from "./Menu.module.scss";
import { notesStore } from "store/notesStore";
import { lazy, Suspense } from "react";
import { FixedSizeList as List } from "react-window";
import { observer } from "mobx-react-lite";
import { HorizontalDivider } from "components/Dividers/Dividers";
import { useGetWindowHeight } from "hooks/useGetWindowHeight";
import { SkeletonLoading } from "components/SkeletonLoading/SkeletonLoading";

interface TagsListProps {
  withDivider?: boolean;
}

export const TagsList = observer(({ withDivider }: TagsListProps) => {
  const TagButton = lazy(() => import("components/Buttons/TagButton"));
  const { containerRef, containerHeight } = useGetWindowHeight();

  const skeletonHeight = 40;
  const skeletonCount = Math.ceil(containerHeight / skeletonHeight);
  const uniqTags = Array.from(
    new Set(
      [...notesStore.notes]
        .filter((note) =>
          location.pathname.includes("archived")
            ? note.isArchived
            : !note.isArchived
        )
        .flatMap((note) => note.tags)
    )
  ).sort();

  return (
    <div className={styles.tagsList}>
      <Suspense
        fallback={
          <div className={styles.tagsListSkeletonContainer}>
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <SkeletonLoading key={index} height={40} />
            ))}
          </div>
        }
      >
        <div ref={containerRef} className={styles.tagsListContainer}>
          {containerHeight > 0 && (
            <List
              className={styles.lazyList}
              height={containerHeight - 50}
              itemCount={uniqTags.length}
              itemSize={45}
              width={"100%"}
              style={{ overflowX: "hidden" }}
            >
              {({ index, style }) => {
                const tag = uniqTags[index];
                return (
                  <div style={style}>
                    <TagButton key={tag} text={tag} />
                    {withDivider && index < uniqTags.length - 1 && (
                      <HorizontalDivider margin="4px 0" />
                    )}
                  </div>
                );
              }}
            </List>
          )}
        </div>
      </Suspense>
    </div>
  );
});
