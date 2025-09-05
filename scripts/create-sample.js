// scripts/create-sample.js
const XLSX = require("xlsx");
const path = require("path");

const data = [
  ["student_id", "student_name", "marks_obtained", "total_marks"],
  ["S001", "Alice Kumar", 78, 100],
  ["S002", "Ravi Patel", 85, 100],
  ["S003", "Maya Singh", 92, 100],
];

const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

const outPath = path.join(process.cwd(), "sample_data_debug.xlsx");
XLSX.writeFile(wb, outPath);
console.log("Wrote sample file:", outPath);
