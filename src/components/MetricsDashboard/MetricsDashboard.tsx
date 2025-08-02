import React, { useMemo } from "react";
import Plot from "react-plotly.js";
import styles from "./MetricsDashboard.module.css";
import type { ExperimentData } from "../../types/experiment";

interface MetricsDashboardProps {
  data: ExperimentData[];
  selectedExperiments: string[];
}

export const MetricsDashboard: React.FC<
  MetricsDashboardProps
> = ({ data, selectedExperiments }) => {
  const filteredData = useMemo(
    () =>
      data.filter((d) =>
        selectedExperiments.includes(d.experiment_id)
      ),
    [data, selectedExperiments]
  );

  const metrics = useMemo(() => {
    return [
      ...new Set(filteredData.map((d) => d.metric_name)),
    ];
  }, [filteredData]);

  const chartDataByMetric = useMemo(() => {
    const map = new Map();

    for (const metric of metrics) {
      const traces = selectedExperiments.map((expId) => {
        const expData = filteredData
          .filter(
            (d) =>
              d.experiment_id === expId &&
              d.metric_name === metric
          )
          .sort((a, b) => a.step - b.step);

        return {
          x: expData.map((d) => d.step),
          y: expData.map((d) => d.value),
          mode: "lines+markers",
          type: "scattergl",
          name: expId,
        };
      });

      map.set(metric, traces);
    }

    return map;
  }, [filteredData, selectedExperiments, metrics]);

  return (
    <div className={styles.dashboard}>
      <h2>Metrics Visualization</h2>
      <div className={styles.grid}>
        {metrics.map((metric) => (
          <div key={metric} className={styles.card}>
            <h3 className={styles.title}>{metric}</h3>
            <Plot
              data={chartDataByMetric.get(metric)}
              layout={{
                margin: { l: 50, r: 20, b: 40, t: 40 },
                xaxis: { title: { text: "Step" } },
                yaxis: { title: { text: "Value" } },
                legend: { orientation: "h" },
              }}
              className={styles.plot}
              config={{
                responsive: true,
                displayModeBar: true,
                displaylogo: false,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
