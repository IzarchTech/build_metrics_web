"use client";

import {
  Box,
  Button,
  Card,
  Group,
  Radio,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import RectangularCulvert from "@repo/core/culvert/rectangular-culvert";
import { Dispatch, SetStateAction, useState } from "react";
import RectangularCulvertComponent from "./rectangular-culvert";

export type CulvertType = "rectangular";

export type CulvertImpl = RectangularCulvert;

const CULVERT_TYPES: { name: string; description: string; id: CulvertType }[] =
  [
    {
      name: "Rectangular Culvert",
      description:
        "A rectangular culvert is a reinforced concrete structure with a rectangular shape used to channel water under roads or embarkments, offering high flow capacity and stability in constrained spaces",
      id: "rectangular",
    },
  ];

function CulvertTypeSelector({
  culvertType,
  setCulvertType,
}: Readonly<{
  culvertType: CulvertType | null;
  setCulvertType: Dispatch<SetStateAction<CulvertType | null>>;
}>) {
  return (
    <Stack justify="space-between" mih={rem(300)}>
      <Radio.Group onChange={(value) => setCulvertType(value as CulvertType)}>
        {CULVERT_TYPES.map((culvert) => (
          <Radio.Card
            key={culvert.id}
            p={rem(10)}
            value={culvert.id}
            checked={culvertType === culvert.id}
          >
            <Group wrap="nowrap" align="flex-start">
              <Radio.Indicator />
              <Stack>
                <Text fw={600}>{culvert.name}</Text>
                <Text c="dimmed" size="sm">
                  {culvert.description}
                </Text>
              </Stack>
            </Group>
          </Radio.Card>
        ))}
      </Radio.Group>

      <Group>
        <Box flex={1} />
        <Button disabled={!culvertType}>&rarr;</Button>
      </Group>
    </Stack>
  );
}

function CalculationView({
  title,
  value,
  unit = "volume",
}: Readonly<{ title: string; value: number; unit?: "volume" | "area" }>) {
  return (
    <Card shadow="sm">
      <Stack gap={rem(1)}>
        <Text fw="bolder" size="sm" c="dimmed">
          {title}
        </Text>
        <Box>
          <Group align="flex-end" gap={0}>
            <Text fw="bold" size={rem(40)}>
              {value.toFixed(2)}
            </Text>
            <Text fs="italic" fw="initial" c="gray">
              m<sup>{unit === "volume" ? 3 : 2}</sup>
            </Text>
          </Group>
        </Box>
      </Stack>
    </Card>
  );
}

function CulvertCalculationSummary({
  culvertImpl,
}: Readonly<{ culvertImpl: CulvertImpl | null }>) {
  if (!culvertImpl) return null;

  return (
    <Stack>
      <CalculationView
        title="Volume of excavation"
        value={culvertImpl.getVolumeOfExcavation()}
      />

      <CalculationView
        title="Volume of blinding"
        value={culvertImpl.getVolumeofBlinding()}
      />

      <CalculationView
        title="Area of formwork"
        value={culvertImpl.getAreaofFormwork()}
        unit="area"
      />

      <CalculationView
        title="Volume of concrete"
        value={culvertImpl.getVolumeOfConcrete()}
      />
    </Stack>
  );
}

function Culvert() {
  const [culvertType, setCulvertType] = useState<CulvertType | null>(null);
  const [culvertImpl, setCulvertImpl] = useState<CulvertImpl | null>(null);
  return (
    <Card shadow="md" radius="md" mih={rem(400)}>
      <CulvertTypeSelector
        culvertType={culvertType}
        setCulvertType={setCulvertType}
      />
      <RectangularCulvertComponent onAnalyse={setCulvertImpl} />
      <CulvertCalculationSummary culvertImpl={culvertImpl} />
    </Card>
  );
}

export default Culvert;
