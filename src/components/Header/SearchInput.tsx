import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import SearchIcon from "assets/images/icon-search.svg?react";
import { notesStore } from "store/notesStore";

interface SearchInputProps {
  handleSearch: (search: string) => void;
  initialValue?: string;
}

export const SearchInput = ({
  handleSearch,
  initialValue = "",
}: SearchInputProps) => {
  const [search, setSearch] = useState<string>(
    initialValue || notesStore.searchNoteQuery
  );

  useEffect(() => {
    const delayQuery = setTimeout(() => {
      notesStore.setSearchNoteQuery(search);
    }, 300);

    return () => {
      clearTimeout(delayQuery);
    };
  }, [search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <label className={styles.searchField}>
      <SearchIcon className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="text"
        name="search"
        id="search"
        value={search}
        autoComplete="off"
        placeholder="Search by title, content, or tags…"
        onChange={handleInputChange}
      />
    </label>
  );
};
