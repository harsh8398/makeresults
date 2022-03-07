import React, { useCallback, useState } from "react";
import Button from "@splunk/react-ui/Button";
import ChevronLeft from "@splunk/react-icons/ChevronLeft";
import ChevronRight from "@splunk/react-icons/ChevronRight";
import StepBar from "@splunk/react-ui/StepBar";
import Heading from "@splunk/react-ui/Heading";
import Modal from "@splunk/react-ui/Modal";

const numSteps = 3;

function Demo({ handleModalClose, open }) {
  const [activeStepId, setActiveStepId] = useState(0);

  const handlePrevious = useCallback(() => {
    setActiveStepId(activeStepId - 1);
  }, [activeStepId]);

  const handleNext = useCallback(() => {
    setActiveStepId(activeStepId + 1);
  }, [activeStepId]);

  const imageURIs = [
    `${process.env.PUBLIC_URL}/images/step1.png`,
    `${process.env.PUBLIC_URL}/images/step2.png`,
    `${process.env.PUBLIC_URL}/images/step3.png`,
  ];
  const helpTexts = [
    "You provide raw JSON event as input.",
    "Input JSON event is tokenized to prevent skewing.",
    "Finally, ready to run Splunk makeresults command is provided for copy.",
  ];

  return (
    <div>
      <Modal onRequestClose={handleModalClose} open={open}>
        <Modal.Header>
          <Heading level={2}>How it works?</Heading>
        </Modal.Header>
        <Modal.Body style={{ width: "800px" }}>
          <StepBar
            activeStepId={activeStepId}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StepBar.Step>Paste JSON</StepBar.Step>
            <StepBar.Step>Tokenize JSON</StepBar.Step>
            <StepBar.Step>Generate events!</StepBar.Step>
          </StepBar>
          <Heading level={3} style={{ textAlign: "center" }}>
            {`${activeStepId + 1}. `}
            {helpTexts[activeStepId]}
          </Heading>
          <br />
          <img
            alt=""
            src={imageURIs[activeStepId]}
            style={{
              display: "block",
              margin: "0 auto",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            icon={<ChevronLeft />}
            label="Back"
            appearance="default"
            disabled={activeStepId === 0}
            onClick={handlePrevious}
          />

          <Button
            label={activeStepId < numSteps - 1 ? "Next" : "Done"}
            appearance="primary"
            onClick={
              activeStepId < numSteps - 1
                ? handleNext
                : () => {
                    setActiveStepId(0);
                    handleModalClose();
                  }
            }
          >
            <ChevronRight />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Demo;
