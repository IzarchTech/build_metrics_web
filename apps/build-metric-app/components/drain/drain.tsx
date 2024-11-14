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
import RectangularDrain from "./rectangular-drain";
import { Dispatch, SetStateAction, useState } from "react";
import { RectangularDrain as RectangularDrainImpl } from "@repo/core";

export type DrainType = "rectangular";

export type DrainImpl = RectangularDrainImpl;

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
}: {
  drainType: DrainType | null;
  setDrainType: Dispatch<SetStateAction<DrainType | null>>;
  handleNextStep: () => void;
}) {
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

  const handleStepClick = (step: number) => {
    if (step > 0 && !drainType) return;

    if (step > 1 && !drainImpl) return;

    setActiveStep(step);
  };

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
    <Card
      shadow="md"
      radius="md"
      w={{ base: rem(315), sm: rem(500), lg: rem(700) }}
      mih={rem(400)}
    >
      <Stepper active={activeStep} onStepClick={handleStepClick}>
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
            <RectangularDrain onAnalyse={handleAnalysis} />
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
