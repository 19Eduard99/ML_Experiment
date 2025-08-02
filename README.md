# ML Experiment Tracker

A frontend application for uploading and visualizing ML experiment logs from a CSV file.

## 🔗 Live Demo

[Open the application](https://19eduard99.github.io/ML_Experiment/)

## 🚀 Features

- Upload CSV files with experiment metrics
- Display a list of available `experiment_id`s
- Visualize selected experiments using interactive line charts

## 🛠️ Tech Stack

- React
- TypeScript
- Plotly.js
- Vite

## 📁 CSV Format

The CSV file must contain the following columns:

- `experiment_id`
- `metric_name`
- `step`
- `value`

### Example:

```csv
experiment_id,metric_name,step,value
1,loss,1,0.9
1,loss,2,0.8
1,accuracy,1,0.5
2,loss,1,0.7
```
