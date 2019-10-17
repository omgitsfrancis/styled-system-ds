import React, {useState} from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import FormField from "./components/FormField";
import { color } from "styled-system";

import { ThemeProvider } from "styled-components";
import theme from "./theme";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteList,
  AutocompletePopover,
  AutocompleteOption
} from "./components/Autocomplete/Autocomplete";
import Select from "./components/Select";

function App() {
  const [error, toggleError] = useState(false)

  const optionsLong = [
    { value: 0, name: "opt1" },
    { value: 1, name: "opt2" },
    { value: 2, name: "opt3" },
    { value: 3, name: "opt4" },
    { value: 4, name: "opt5" },
    { value: 5, name: "opt6" },
    { value: 6, name: "opt7" },
    { value: 7, name: "opt8" },
    { value: 8, name: "opt9" },
    { value: 9, name: "opt10" },
    { value: 10, name: "opt11" },
    { value: 11, name: "opt12" },
    { value: 12, name: "opt13" },
    { value: 13, name: "opt14" },
    { value: 14, name: "opt15" },
    { value: 15, name: "opt16" },
    { value: 16, name: "opt17" },
    { value: 17, name: "opt18" },
    { value: 18, name: "opt19" },
    { value: 19, name: "opt20" },
    { value: 20, name: "opt21" },
    { value: 21, name: "opt22" }
  ];
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Autocomplete>
          <AutocompleteInput placeholder="Search" />
          <AutocompletePopover>
            <AutocompleteList>
              {optionsLong.map(({ name, value }) => (
                <AutocompleteOption key={value} value={name} />
              ))}
            </AutocompleteList>
          </AutocompletePopover>
        </Autocomplete>

        <Button size="small">STYLED BUTTON - small</Button>
        <Button m={2} bg="error">
          STYLED BUTTON - DEFAULT
        </Button>
        <Button size="large">STYLED BUTTON - large</Button>
        <br />
        <Input width="25%" placeholder="placeholder"></Input>
        <br />
        <Select width="25%">
          {optionsLong.map(({ name, value }) => (
            <option key={value}>{name}</option>
          ))}
        </Select>

        <div style={{marginTop: "50px", width:"25%"}}>
          <FormField label="THis is a label" error={error && "error goes here"}>
            <Input placeholder="placeholder"></Input>
          </FormField>
          <FormField label="THis is a label" error={error && "error goes here"}>
            <Select>
              {optionsLong.map(({ name, value }) => (
                <option key={value}>{name}</option>
              ))}
            </Select>
          </FormField>
          <Button onClick={() => toggleError(!error)}>TOGGLE ERROR</Button>
        </div>

      </div>
    </ThemeProvider>
  );
}

export default App;
