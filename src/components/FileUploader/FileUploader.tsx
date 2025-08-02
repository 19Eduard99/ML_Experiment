import React, { useState } from "react";
import Papa from "papaparse";
import type { ExperimentData } from "../../types/experiment";
import styles from "./FileUploader.module.css";
import { Loader } from "../Loader.tsx";

interface FileUploaderProps {
  setExperimentData: React.Dispatch<
    React.SetStateAction<ExperimentData[]>
  >;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  setExperimentData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      alert("Please select a CSV file");
      return;
    }

    setIsLoading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      worker: true,
      complete: (result) => {
        const validData = (result.data as any[])
          .filter(
            (d) =>
              d.experiment_id &&
              d.metric_name &&
              !isNaN(Number(d.step)) &&
              !isNaN(Number(d.value))
          )
          .map((d) => ({
            experiment_id: String(d.experiment_id),
            metric_name: String(d.metric_name),
            step: Number(d.step),
            value: Number(d.value),
          }));

        setExperimentData(validData);
        setIsLoading(false);
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
        alert("Error parsing CSV file");
        setIsLoading(false);
      },
    });
  };

  return (
    <div className={styles["file-uploader"]}>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
};
