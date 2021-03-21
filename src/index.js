import React, { Component, forwardRef } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import Input from "@material-ui/core/Input";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";
import FilterList from "@material-ui/icons/FilterList";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import './i18n';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const useStyles2 = makeStyles(theme => ({
  formControl: {
    "margin-left": 1000,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const App = () => {
  const { t, i18n } = useTranslation();
  const columns = [
    { title: t("Name"), field: "name" },
    { title: t("Town"), field: "town" },
    { title: t("Digits"), field: "digits", type: "currency" }
  ];
  const [columnsList, setColumns] = React.useState([]);
  const [lang, setLang] = React.useState('en');
  const classes = useStyles();
  const classes2 = useStyles2();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const tableIcons = {
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />)
  };

  const data = [
    {
      name: "skube",
      town: <input value="sample input data" />,
      digits: 1
    },
    { name: "jimmy", town: "scaraborough", digits: 555 },
    { name: "xiu", town: "china", digits: 999 }
  ];

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const options = { filtering: false, selection: false };

  const handleChange = event => {
    const value = event.target.value;
    setColumns(value);
  };

  const getColumns = (columnsArray) => {
    return columnsArray.map((column) => {
      if(!columnsList.includes(column.field)) {
        return column;
      }
    }).filter(Boolean)
  }

  const getColumnsHidden = (columnsArray) => {
    return columnsArray.map((column) => {
      if(columnsList.includes(column.field)) {
        return column;
      }
    }).filter(Boolean)
  }

  const getData = (dataList) => {
    let newArr = [];
    if(getColumnsHidden(columns).length > 0) {
      dataList.map((eachValue) => {
        Object.keys(eachValue).map((key) => {
          if(getColumnsHidden(columns).findIndex((e) => e.field === key) > -1) {
            newArr.push({
              ...eachValue,
              [key]: null
            })
          }
        })
      });
      const removedDuplicates = newArr.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
      return removedDuplicates;
    } else {
      return dataList;
    }
  }

  const handleChangeLang = (event) => {
    setLang(event.target.value); console.log(event.target.value, i18n)
    i18n.changeLanguage(event.target.value)
  }

  return (
    <React.Fragment>
      <h1>{t('Welcome to Dashboard')}</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-checkbox-label">{t("Hide/Show")}</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={columnsList}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {columns.map(name => (
            <MenuItem key={name.field} value={name.field}>
              <Checkbox checked={columnsList.indexOf(name.field) > -1} />
              <ListItemText primary={name.field} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes2.formControl}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          onChange={handleChangeLang}
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"es"}>Spanish</MenuItem>
          <MenuItem value={"fr"}>French</MenuItem>
        </Select>
      </FormControl>
      <MaterialTable
        title={t("Sales Data")}
        icons={tableIcons}
        columns={getColumns(columns)}
        data={getData(data)}
        options={options}
      />
    </React.Fragment>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
