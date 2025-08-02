import React, { useMemo } from "react";
import type { ExperimentData } from "../../types/experiment";
import styles from "./ExperimentList.module.css";

interface ExperimentListProps {
  data: ExperimentData[];
  selectedExperiments: string[];
  setSelectedExperiments: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

export const ExperimentList: React.FC<
  ExperimentListProps
> = ({
  data,
  selectedExperiments,
  setSelectedExperiments,
}) => {
  const uniqueExperimentIds = useMemo(() => {
    return [
      ...new Set(data.map((item) => item.experiment_id)),
    ];
  }, [data]);

  const handleToggle = (id: string) => {
    setSelectedExperiments((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className={styles["experiment-list"]}>
      <h2 className={styles["experiment-title"]}>
        Available Experiments ({uniqueExperimentIds.length})
      </h2>
      <div className={styles["experiment-checkboxes"]}>
        {uniqueExperimentIds.map((id) => (
          <label
            key={id}
            className={styles["experiment-label"]}
          >
            <input
              type="checkbox"
              checked={selectedExperiments.includes(id)}
              onChange={() => handleToggle(id)}
            />
            <span
              className={styles["custom-checkbox"]}
            ></span>
            {id}
          </label>
        ))}
      </div>
    </div>
  );
};
