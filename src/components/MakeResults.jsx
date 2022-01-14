import Input from "@splunk/react-search/components/Input";
import ReactGA from "react-ga";

function MakeResults({ search }) {
  ReactGA.event({
    category: "MakeResults",
    action:
      "Converted a JSON event to a event generating SPL command with makeresults",
  });
  return (
    <>
      <h1>Corresponding Command:</h1>
      <Input value={search} />
    </>
  );
}

export default MakeResults;
