import "./App.css";
import { useState } from "react";
import SplunkThemeProvider from "@splunk/themes/SplunkThemeProvider";
import JSONInput from "./components/JSONInput";
import ColumnLayout from "@splunk/react-ui/ColumnLayout";
import Heading from "@splunk/react-ui/Heading";
import MakeResults from "./components/MakeResults";

function App() {
  const [search, setSearch] = useState("# search will get generated here...");
  const [converted, setConverted] = useState(false);
  return (
    <SplunkThemeProvider family="prisma" density="compact" colorScheme="dark">
      <div className="App">
        <Heading level={1}>&gt; makeresults</Heading>
        <ColumnLayout gutter={8}>
          <ColumnLayout.Row>
            <ColumnLayout.Column span={12}>
              <JSONInput
                setSearch={setSearch}
                converted={converted}
                setConverted={setConverted}
              />
            </ColumnLayout.Column>
          </ColumnLayout.Row>
          <ColumnLayout.Row>
            <ColumnLayout.Column span={12}>
              {converted && <MakeResults search={search} />}
            </ColumnLayout.Column>
          </ColumnLayout.Row>
        </ColumnLayout>
      </div>
    </SplunkThemeProvider>
  );
}

export default App;
