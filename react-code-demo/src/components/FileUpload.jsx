import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Report from "./Report";

const EXPECTED_COLUMNS = ["Sl No", "Name", "Class", "Section", "Age", "Attendance"];

const FileUpload = () => {
  const inputRef = useRef();
  const [error, setError] = useState("");
  const [reportData, setReportData] = useState(null);
  const [dbData, setDbData] = useState([]);
  const [fileName, setFileName] = useState("");

  
  const validateRow = (row) => {
    const errors = [];
    EXPECTED_COLUMNS.forEach((col) => {
      const value = row[col];
      if (value === undefined || value === null || value.toString().trim() === "") {
        errors.push(`${col} is missing`);
      }
    });
    if (row.Age && !/\d+/.test(row.Age)) {
      errors.push("Age must include a number");
    }
    if (!["True", "False"].includes(row.Attendance)) {
      errors.push("Attendance must be True or False");
    }
    return errors;
  };


  const handleFileUpload = (event) => {
    setError("");
    const file = event.target.files[0];
    if (!file) return;


    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type! Please upload a .xls or .xlsx file.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });


      const columns = Object.keys(jsonData[0] || {});
      if (JSON.stringify(columns) !== JSON.stringify(EXPECTED_COLUMNS)) {
        setError(`Invalid columns! Expected: ${EXPECTED_COLUMNS.join(", ")}`);
        return;
      }

      let validData = [];
      let invalidData = [];
      let errorDetails = [];
      let duplicateRows = [];
      const seen = new Set();

      jsonData.forEach((row, idx) => {
        const rowErrors = validateRow(row);
        const key = `${row.Name}-${row.Class}-${row.Section}`;
        if (seen.has(key)) {
          rowErrors.push("Duplicate record");
          duplicateRows.push({ row: idx + 2, ...row });
        } else {
          seen.add(key);
        }
        if (rowErrors.length > 0) {
          invalidData.push(row);
          errorDetails.push({ row: idx + 2, errors: rowErrors, data: row });
        } else {
          validData.push(row);
        }
      });

      setReportData({
        summary: {
          totalRows: jsonData.length,
          validCount: validData.length,
          errorCount: invalidData.length,
        },
        errors: errorDetails,
        duplicates: duplicateRows,
        validData,
      });
    };

    reader.readAsArrayBuffer(file);
  };

 
  const handleBack = () => setReportData(null);

  const handleSave = () => {
    if (!reportData?.validData.length) {
      alert("No valid records to save.");
      return;
    }
    const updatedDB = [...dbData, ...reportData.validData];
    setDbData(updatedDB);
    alert("Valid data saved locally!");
  };

  const handleBoxClick = () => {
    inputRef.current && inputRef.current.click();
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafbfc", display: "flex", flexDirection: "column", alignItems: "center", pt: 4 }}>
      {!reportData ? (
        <>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#3f51b5" }}>
            File Upload & Image Preview
          </Typography>
          <Typography sx={{ color: "#666", mb: 3 }}>
            No Plugins <span style={{ fontWeight: 600, color: "#3f51b5" }}>Just Javascript</span>
          </Typography>
          <Box
            onClick={handleBoxClick}
            sx={{
              border: "2px solid #bdbdfc",
              borderRadius: 3,
              width: 500,
              height: 180,
              bgcolor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: 1,
              mb: 2,
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: "#757de8", mb: 1 }} />
            <Typography sx={{ color: "#888", mb: 2 }}>
              Select a file or drag here
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#3f51b5",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                borderRadius: 1,
              }}
              onClick={e => { e.stopPropagation(); handleBoxClick(); }}
            >
              Select a file
            </Button>
            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".xls,.xlsx"
              onChange={handleFileUpload}
            />
          </Box>
          {fileName && <Typography>Uploaded File: {fileName}</Typography>}
          {error && <Typography color="error">{error}</Typography>}
        </>
      ) : (
        <>
          <Report
            summary={reportData.summary}
            errors={reportData.errors}
            duplicates={reportData.duplicates}
            validData={reportData.validData}
            onBack={handleBack}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Valid Records
          </Button>
          {dbData.length > 0 && (
            <Box mt={4}>
              <Typography variant="h5">Saved "Database" Data</Typography>
              <pre>{JSON.stringify(dbData, null, 2)}</pre>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default FileUpload;