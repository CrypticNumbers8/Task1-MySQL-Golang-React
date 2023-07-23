import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";

import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Event handler for column click
  const handleColumnClick = (column) => {
    if (column === selectedColumn) {
      // toggle the sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set the new selected column and sort in ascending order
      setSelectedColumn(column);
      setSortOrder("asc");
    }
  };

  // Helper function to render the sorting indicator arrow
  const renderSortIndicator = (column) => {
    if (selectedColumn === column) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:6060/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="root">
      <Typography variant="h4" gutterBottom>
        Employee Performance Dashboard
      </Typography>
      <TableContainer component={Paper} className="tableContainer">
        <Table className="table" aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleColumnClick("id")}
                className={selectedColumn === "id" ? "selected" : ""}
              >
                ID {renderSortIndicator("id")}
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick("name")}
                className={selectedColumn === "name" ? "selected" : ""}
              >
                Name {renderSortIndicator("name")}
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick("performance")}
                className={selectedColumn === "performance" ? "selected" : ""}
              >
                Performance {renderSortIndicator("performance")}
              </TableCell>
              <TableCell
                onClick={() => handleColumnClick("date")}
                className={selectedColumn === "date" ? "selected" : ""}
              >
                Date {renderSortIndicator("date")}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.performance}</TableCell>
                <TableCell>{employee.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
