import { useState } from "react";
import Text from "@splunk/react-ui/Text";
import Button from "@splunk/react-ui/Button";
import Code from "@splunk/react-icons/Code";
import ArrowLeft from "@splunk/react-icons/ArrowLeft";
import Check from "@splunk/react-icons/Check";
import JSONTree from "@splunk/react-ui/JSONTree";
import { debounce, convertToMakeResults } from "../utils/utils";
import ReactGA from "react-ga";

function JSONInput({ setSearch, converted, setConverted }) {
  const [value, setValue] = useState("");
  const [json, setJson] = useState({});
  const [error, setError] = useState(false);
  let handleChange = (e, { value }) => {
    setValue(value);
  };
  let handleClick = debounce(() => {
    let [res, obj] = convertToMakeResults(value, true);
    if (res === -1) {
      setError(true);
    } else {
      setSearch(res);
      setJson(obj);
      setConverted(true);
    }
  });
  if (error) {
    ReactGA.event({
      category: "JSONParseError",
      action: "Malformed JSON was provided.",
    });
    // reset
    return (
      <>
        <Button
          icon={<ArrowLeft screenReaderText={null} />}
          label="Try Again"
          onClick={() => {
            setError(false);
            setValue("");
            setSearch("");
            setConverted(false);
          }}
        />
        <br />
        <h1>Error! Please validate JSON input!</h1>
      </>
    );
  }
  return (
    <>
      {converted ? (
        <>
          <Button
            icon={<ArrowLeft screenReaderText={null} />}
            label="Go Back"
            onClick={() => setConverted(false)}
          />
          <br />
          <h1>Tokenized JSON</h1>
          <JSONTree json={json} expandChildren />
        </>
      ) : (
        <>
          <h1>Paste any JSON event:</h1>
          <Text
            value={value}
            startAdornment={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                }}
              >
                <Code size={1} />
              </div>
            }
            multiline
            placeholder="Paste any JSON event here..."
            onChange={handleChange}
            spellCheck={false}
          />
          <br />
          <Button
            icon={<Check screenReaderText={null} />}
            label="makeresults!"
            onClick={handleClick}
          />
        </>
      )}
    </>
  );
}

export default JSONInput;
