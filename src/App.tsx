import React, { useState } from "react";
import { FileUploader } from "./components/FileUploader";

import type { ExperimentData } from "./types/experiment";
import { ExperimentList } from "./components/ExperimentList";
import { MetricsDashboard } from "./components/MetricsDashboard";
import { Header } from "./components/Header";

const App: React.FC = () => {
  const [experimentData, setExperimentData] = useState<
    ExperimentData[]
  >([]);
  const [selectedExperiments, setSelectedExperiments] =
    useState<string[]>([]);

  return (
    <div className="App">
      <Header title="ML Experiment Tracker" />
      <FileUploader setExperimentData={setExperimentData} />
      <div className="container">
        {experimentData.length > 0 && (
          <>
            <ExperimentList
              data={experimentData}
              selectedExperiments={selectedExperiments}
              setSelectedExperiments={
                setSelectedExperiments
              }
            />

            <MetricsDashboard
              data={experimentData}
              selectedExperiments={selectedExperiments}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
