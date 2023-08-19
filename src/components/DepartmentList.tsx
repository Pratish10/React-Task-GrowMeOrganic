import React, { useState } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import data from "../department.json";

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleToggle = (item: string) => {
    const currentIndex = selectedItems.indexOf(item);
    const newSelected = [...selectedItems];

    if (currentIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedItems(newSelected);
  };

  const handleExpand = (department: string) => {
    if (expanded.includes(department)) {
      setExpanded(expanded.filter((dep) => dep !== department));
    } else {
      setExpanded([...expanded, department]);
    }
  };

  const isExpanded = (department: string) => expanded.includes(department);

  const isDepartmentSelected = (department: string) =>
    selectedItems.includes(department);

  const areAllSubDepartmentsSelected = (department: string) => {
    const subDepartments = data.find(
      (item) => item.department === department
    )?.sub_departments;

    if (subDepartments) {
      return subDepartments.every((subDep) => selectedItems.includes(subDep));
    }

    return false;
  };

  const handleSelectAllSubDepartments = (department: string) => {
    const subDepartments = data.find(
      (item) => item.department === department
    )?.sub_departments;

    if (subDepartments) {
      if (areAllSubDepartmentsSelected(department)) {
        setSelectedItems(
          selectedItems.filter((item) => !subDepartments.includes(item))
        );
      } else {
        setSelectedItems([...selectedItems, ...subDepartments]);
      }
    }
  };

  return (
    <List>
      {data.map((item) => (
        <React.Fragment key={item.department}>
          <ListItem button onClick={() => handleExpand(item.department)}>
            <ListItemIcon>
              <Checkbox
                indeterminate={
                  isDepartmentSelected(item.department) &&
                  !areAllSubDepartmentsSelected(item.department)
                }
                checked={areAllSubDepartmentsSelected(item.department)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectAllSubDepartments(item.department);
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={`${item.department} (${item.sub_departments.length})`}
            />
            {isExpanded(item.department) ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </ListItem>
          <Collapse in={isExpanded(item.department)}>
            <List component="div" disablePadding>
              {item.sub_departments.map((subDep) => (
                <ListItem
                  key={subDep}
                  button
                  onClick={(e) => e.stopPropagation()}
                  style={{ marginLeft: "40px" }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={selectedItems.includes(subDep)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(subDep);
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDep} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
