import { Button, NumberInput, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { RectangularDrain as RectangularDrainImpl } from "@repo/core";
import { z } from "zod";
import rectangularDrainImg from "./rectangular-drain.png";
import { DrainImpl } from "./drain";
import Image from "next/image";

const rectangularDrainSchema = z.object({
  width: z.number().min(0.01, "Width should be greater than 0.0"),
  depth: z.number().min(0.01, "Depth should be greater than 0.0"),
  span: z.number().min(0.01, "Span should be greater than 0.0"),
  thickness: z.number().min(0.01, "Thickness should be greater than 0.0"),
  blindingThickness: z
    .number()
    .min(0.01, "Blinding thickness should be greater than 0.0"),
  workingAllowance: z.number().nullable(),
});

function RectangularDrain({
  onAnalyse,
}: Readonly<{
  onAnalyse: (drainImpl: DrainImpl) => void;
}>) {
  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(rectangularDrainSchema),
    initialValues: {
      width: 0.0,
      depth: 0.0,
      span: 0.0,
      thickness: 0.0,
      blindingThickness: 0.0,
      workingAllowance: 0.0,
    },
  });

  const handleSubmit = form.onSubmit(
    ({
      width,
      depth,
      span,
      thickness,
      blindingThickness,
      workingAllowance,
    }) => {
      const rd = new RectangularDrainImpl(
        width,
        depth,
        span,
        thickness,
        blindingThickness,
        workingAllowance,
      );

      onAnalyse(rd);
    },
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <Image src={rectangularDrainImg} alt="rectangular drain" />
        <NumberInput
          label="w"
          description="Width of the drain"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("width")}
          {...form.getInputProps("width")}
        />
        <NumberInput
          label="d"
          description="Depth of the drain"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("depth")}
          {...form.getInputProps("depth")}
        />
        <NumberInput
          label="t"
          description="Thickness of the drain"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("thickness")}
          {...form.getInputProps("thickness")}
        />
        <NumberInput
          label="s"
          description="Span of the drain"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("span")}
          {...form.getInputProps("span")}
        />
        <NumberInput
          label={
            <>
              <span>b</span>
              <sub>t</sub>
            </>
          }
          description="Blinding thickness"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("blindingThickness")}
          {...form.getInputProps("blindingThickness")}
        />
        <NumberInput
          label={
            <>
              <span>w</span>
              <sub>a</sub>
            </>
          }
          description="Working allowance"
          min={0.01}
          step={0.01}
          allowDecimal
          key={form.key("workingAllowance")}
          {...form.getInputProps("workingAllowance")}
        />

        <Button type="submit">Analyse</Button>
      </Stack>
    </form>
  );
}

export default RectangularDrain;
