import "./App.css";
import { useState } from "react";
import SplunkThemeProvider from "@splunk/themes/SplunkThemeProvider";
import JSONInput from "./components/JSONInput";
import ColumnLayout from "@splunk/react-ui/ColumnLayout";
import Heading from "@splunk/react-ui/Heading";
import Link from "@splunk/react-ui/Link";
import MakeResults from "./components/MakeResults";
import ReactGA from "react-ga";

const TRACKING_ID = "UA-143614136-3";
ReactGA.initialize(TRACKING_ID);

function App() {
  const [search, setSearch] = useState("# search will get generated here...");
  const [converted, setConverted] = useState(false);

  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <SplunkThemeProvider family="prisma" density="compact" colorScheme="dark">
      <div className="App">
        <div className="Header">
          <Heading level={1}>&gt; makeresults</Heading>
        </div>
        <div className="Body">
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
        <div className="Footer">
          <ColumnLayout gutter={8}>
            <ColumnLayout.Row>
              <ColumnLayout.Column span={6}>
                <Heading level={4}>
                  <Link to="https://github.com/harsh8398/makeresults">
                    Source
                  </Link>
                </Heading>
              </ColumnLayout.Column>
              <ColumnLayout.Column span={6}>
                <Heading level={4} style={{ textAlign: "right" }}>
                  Made with ☕ by{" "}
                  <Link to="https://github.com/harsh8398">Harsh Patel</Link>
                </Heading>
              </ColumnLayout.Column>
            </ColumnLayout.Row>
          </ColumnLayout>
        </div>
      </div>
    </SplunkThemeProvider>
  );
}

export default App;
