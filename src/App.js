import "./App.css";
import { useState, useRef, useEffect } from "react";
import SplunkThemeProvider from "@splunk/themes/SplunkThemeProvider";
import JSONInput from "./components/JSONInput";
import ColumnLayout from "@splunk/react-ui/ColumnLayout";
import Heading from "@splunk/react-ui/Heading";
import Link from "@splunk/react-ui/Link";
import MakeResults from "./components/MakeResults";
import ReactGA from "react-ga";
import Demo from "./components/Demo";

const TRACKING_ID = "UA-143614136-3";
ReactGA.initialize(TRACKING_ID);

function App() {
  const [search, setSearch] = useState("# search will get generated here...");
  const [converted, setConverted] = useState(false);

  ReactGA.pageview(window.location.pathname + window.location.search);

  const modalToggle = useRef(null);

  const [open, setOpen] = useState(false);

  const handleRequestOpen = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
    modalToggle?.current?.focus(); // Must return focus to the invoking element when the modal closes
  };

  useEffect(() => {
    let firstDemoStatus = localStorage.getItem("firstDemoStatus");
    if (!firstDemoStatus) {
      setOpen(true);
      localStorage.setItem("firstDemoStatus", true);
    }
  }, []);

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
                <Heading level={4} inline>
                  <Link onClick={handleRequestOpen} ref={modalToggle}>
                    Demo
                  </Link>
                </Heading>
              </ColumnLayout.Column>
              <ColumnLayout.Column span={6}>
                <Heading level={4} style={{ textAlign: "right" }}>
                  <Link to="https://github.com/harsh8398/makeresults">
                    Source
                  </Link>
                </Heading>
              </ColumnLayout.Column>
            </ColumnLayout.Row>
          </ColumnLayout>
        </div>
      </div>
      <Demo handleModalClose={handleRequestClose} open={open} />
    </SplunkThemeProvider>
  );
}

export default App;
