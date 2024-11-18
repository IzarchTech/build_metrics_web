"use client";

import {
  Box,
  Button,
  Card,
  Group,
  Radio,
  rem,
  Stack,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import RectangularDrainComponent from "./rectangular-drain";
import { Dispatch, SetStateAction, useState } from "react";
import RectangularDrain from "@repo/core/drain/rectangular-drain";

export type DrainType = "rectangular";

export type DrainImpl = RectangularDrain;

const DRAIN_TYPES: { name: string; description: string; id: DrainType }[] = [
  {
    name: "Rectangular Drain",
    description:
      "As the name suggests, these drains have a rectangular cross-section, which can vary in size depending on the required capacity and application.",
    id: "rectangular",
  },
];

function DrainTypeSelector({
  drainType,
  setDrainType,
  handleNextStep,
}: Readonly<{
  drainType: DrainType | null;
  setDrainType: Dispatch<SetStateAction<DrainType | null>>;
  handleNextStep: () => void;
}>) {
  return (
    <Stack justify="space-between" mih={rem(300)}>
      <Radio.Group onChange={(value) => setDrainType(value as DrainType)}>
        {DRAIN_TYPES.map((drain) => (
          <Radio.Card
            key={drain.id}
            p={rem(10)}
            value={drain.id}
            checked={drainType === drain.id}
          >
            <Group wrap="nowrap" align="flex-start">
              <Radio.Indicator />
              <Stack>
                <Text fw={600}>{drain.name}</Text>
                <Text c="dimmed" size="sm">
                  {drain.description}
                </Text>
              </Stack>
            </Group>
          </Radio.Card>
        ))}
      </Radio.Group>
      <Group>
        <Box flex={1} />
        <Button disabled={!drainType} onClick={handleNextStep}>
          &rarr;
        </Button>
      </Group>
    </Stack>
  );
}

export default function Drain() {
  const [activeStep, setActiveStep] = useState(0);
  const [drainType, setDrainType] = useState<DrainType | null>(null);
  const [drainImpl, setDrainImpl] = useState<DrainImpl | null>(null);

  const handleNextStep = () => {
    if (activeStep < 2) {
      setActiveStep((current) => current + 1);
    }
  };

  const handleAnalysis = (drainImpl: DrainImpl) => {
    setDrainImpl(drainImpl);
    setActiveStep(2);
  };

  return (
    <Card shadow="md" radius="md" mih={rem(400)}>
      <Stepper active={activeStep}>
        <Stepper.Step label="Drain type" description="Choose drain">
          <DrainTypeSelector
            drainType={drainType}
            setDrainType={setDrainType}
            handleNextStep={handleNextStep}
          />
        </Stepper.Step>

        <Stepper.Step
          label="Configure drain"
          description="Input all parameters"
        >
          {drainType === "rectangular" && (
            <RectangularDrainComponent onAnalyse={handleAnalysis} />
          )}
        </Stepper.Step>

        <Stepper.Step label="Summary" description="View Results">
          {drainImpl && (
            <>
              <Title order={6}>Volume of Excavation</Title>
              <Text>
                {drainImpl.getVolumeOfExcavation().toFixed(2)} m<sup>3</sup>
              </Text>
              <Title order={6}>Volume of Blinding</Title>
              <Text>
                {drainImpl.getVolumeofBlinding().toFixed(2)} m<sup>3</sup>
              </Text>
              <Title order={6}>Area of Formwork</Title>
              <Text>
                {drainImpl.getAreaofFormwork().toFixed(2)} m<sup>2</sup>
              </Text>
              <Title order={6}>Volume of Concrete</Title>
              <Text>
                {drainImpl.getVolumeOfConcrete().toFixed(2)} m<sup>3</sup>
              </Text>
            </>
          )}
        </Stepper.Step>
      </Stepper>
    </Card>
  );
}
