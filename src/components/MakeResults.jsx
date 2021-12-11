import Input from "@splunk/react-search/components/Input";

function MakeResults({ search }) {
  return (
    <>
      <h1>Corresponding Command:</h1>
      <Input value={search} />
    </>
  );
}

export default MakeResults;
