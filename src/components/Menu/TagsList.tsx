import styles from "./Menu.module.scss";
import { notesStore } from "store/notesStore";
import { lazy, Suspense } from "react";
import { FixedSizeList as List } from "react-window";
import { observer } from "mobx-react-lite";
import { HorizontalDivider } from "components/Dividers/Dividers";

interface TagsListProps {
  withDivider?: boolean;
}

export const TagsList = observer(({ withDivider }: TagsListProps) => {
  const TagButton = lazy(() => import("components/Buttons/TagButton"));

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
      <Suspense fallback={<div>Loading...</div>}>
        <List
          className={styles.lazyList}
          height={window.innerHeight - 230}
          itemCount={uniqTags.length}
          itemSize={45}
          width={"100%"}
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
      </Suspense>
    </div>
  );
});
