import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Report = ({
  summary,
  errors,
  duplicates,
  validData = [],
  onBack,
  onSave,
  showSave = false,
}) => (
  <Box sx={{ width: "100%", mt: 4 }}>
    <Box display="flex" justifyContent="flex-end" mb={2}>
      
 <Button
        onClick={onBack}
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{
          bgcolor: "#14d9f5",
          color: "#fff",
          borderRadius: "7px",
          px: 2.5,
          py: 0.5,
          fontWeight: 500,
          fontSize: 16,
          minWidth: 0,
          boxShadow: "none",
          textTransform: "none",
          "&:hover": { bgcolor: "#0bb3cc", boxShadow: "none" },
        }}
      >
        Back
      </Button>
    </Box>
    
    <Typography
      variant="h3"
      align="center"
      sx={{ fontWeight: 600, mb: 4, color: "#23272b" }}
    >
      REPORT ON DATA
    </Typography>
    <Box display="flex" justifyContent="center" gap={4} mb={4}>
      <Card sx={{ minWidth: 260, bgcolor: "#b3dbe7" }}>
        <CardContent>
          <Typography align="center" sx={{ fontWeight: 600, fontSize: 20, mb: 1 }}>
            TOTAL REPORTS
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: "#7fa6b3" }} />
          <Typography align="center" sx={{ fontSize: 24, fontWeight: 500, mb: 1 }}>
            NO : {summary.totalRows}
          </Typography>
          <Box display="flex" justifyContent="center">
            <MenuIcon fontSize="large" />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 260, bgcolor: "#23bdb8" }}>
        <CardContent>
          <Typography align="center" sx={{ fontWeight: 600, fontSize: 20, mb: 1 }}>
            VALID REPORTS
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: "#178a87" }} />
          <Typography align="center" sx={{ fontSize: 24, fontWeight: 500, mb: 1 }}>
            NO : {summary.validCount}
          </Typography>
          <Box display="flex" justifyContent="center">
            <CheckCircleOutlineIcon fontSize="large" />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 260, bgcolor: "#e06666" }}>
        <CardContent>
          <Typography align="center" sx={{ fontWeight: 600, fontSize: 20, mb: 1 }}>
            INVALID REPORTS
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: "#b94a48" }} />
          <Typography align="center" sx={{ fontSize: 24, fontWeight: 500, mb: 1 }}>
            NO : {summary.errorCount}
          </Typography>
          <Box display="flex" justifyContent="center">
            <CancelOutlinedIcon fontSize="large" />
          </Box>
        </CardContent>
      </Card>
    </Box>

   
    {validData.length > 0 && (
      <>
        <Typography variant="h5" sx={{ mb: 2 }}>
        Valid Records
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validData.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row["Sl No"]}</TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Class}</TableCell>
                <TableCell>{row.Section}</TableCell>
                <TableCell>{row.Age}</TableCell>
                <TableCell
                  sx={{
                    bgcolor:
                      row.Attendance === "False" ? "#e06666" : "inherit",
                    color: row.Attendance === "False" ? "#fff" : "inherit",
                  }}
                >
                  {row.Attendance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )}

    {/* Error Table */}
    {errors.length > 0 && (
      <>
        <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
         Error Reports
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Row</TableCell>
              <TableCell>Errors</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errors.map((err, i) => (
              <TableRow key={i}>
                <TableCell>{err.row}</TableCell>
                <TableCell>{err.errors.join(", ")}</TableCell>
                <TableCell>
                  {Object.entries(err.data).map(([key, value]) => (
                    <span
                      key={key}
                      style={{
                        backgroundColor:
                          key === "Attendance" && value === "False"
                            ? "#e06666"
                            : "inherit",
                        color:
                          key === "Attendance" && value === "False"
                            ? "#fff"
                            : "inherit",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        marginRight: 4,
                      }}
                    >
                      {key}: {value}{" "}
                    </span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )}

    {/* Duplicate Table */}
    {duplicates.length > 0 && (
      <>
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
           Duplicate Records
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Row</TableCell>
              <TableCell>Sl No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {duplicates.map((dup, i) => (
              <TableRow key={i}>
                <TableCell>{dup.row}</TableCell>
                <TableCell>{dup["Sl No"]}</TableCell>
                <TableCell>{dup.Name}</TableCell>
                <TableCell>{dup.Class}</TableCell>
                <TableCell>{dup.Section}</TableCell>
                <TableCell>{dup.Age}</TableCell>
                <TableCell
                  sx={{
                    bgcolor:
                      dup.Attendance === "False" ? "#e06666" : "inherit",
                    color: dup.Attendance === "False" ? "#fff" : "inherit",
                  }}
                >
                  {dup.Attendance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )}

    {/* Save Button */}
    {showSave && validData.length > 0 && (
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" onClick={onSave}>
          SAVE VALID RECORDS
        </Button>
      </Box>
    )}
  </Box>
);

export default Report;