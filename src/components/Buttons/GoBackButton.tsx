import { useDeselectNoteAndNavigate } from "hooks/useDeselectNoteAndNavigate";
import styles from "./buttons.module.scss";
import goBackIcon from "assets/images/icon-arrow-left.svg";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";

export const GoBackButton = () => {
  const deselectNoteAndNavigate = useDeselectNoteAndNavigate();
  const location = useLocation();

  return (
    <button className={styles.goBackButton} onClick={deselectNoteAndNavigate}>
      <img className={styles.goBackIcon} src={goBackIcon} alt="goBackIcon" />
      {location.pathname === `/settings/color-theme` ||
      location.pathname === `/settings/font-theme`
        ? "Settings"
        : "Go Back"}
    </button>
  );
};
