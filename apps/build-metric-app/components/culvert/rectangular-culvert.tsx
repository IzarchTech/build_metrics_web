import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import RectangularCulvert from "@repo/core/culvert/rectangular-culvert";
import { Button, NumberInput, Stack } from "@mantine/core";
import { CulvertImpl } from "./culvert";

const rectangularCulvertSchema = z.object({
  width: z.number().min(0.01, "Width should be greater than 0.0"),
  depth: z.number().min(0.01, "Depth should be greater than 0.0"),
  span: z.number().min(0.01, "Span should be greater than 0.0"),
  thickness: z.number().min(0.01, "Thickness should be greater than 0.0"),
  noOfCells: z.number().min(1, "No of cells should be atleast one"),
  blindingThickness: z
    .number()
    .min(0.01, "Blinding thickness should be greater than 0.0"),
  workingAllowance: z
    .number()
    .min(0, "Working allowance can not be less than 0")
    .nullable(),
});

function RectangularCulvertComponent({
  onAnalyse,
}: Readonly<{ onAnalyse: (culvertImpl: CulvertImpl) => void }>) {
  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(rectangularCulvertSchema),
    initialValues: {
      width: 0.0,
      depth: 0.0,
      span: 0.0,
      thickness: 0.0,
      noOfCells: 1,
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
      noOfCells,
      blindingThickness,
      workingAllowance,
    }) => {
      const rc = new RectangularCulvert(
        width,
        depth,
        span,
        thickness,
        blindingThickness,
        noOfCells,
        workingAllowance,
      );

      onAnalyse(rc);
    },
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <NumberInput
          label="w"
          description="Width of the culvert"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("width")}
          {...form.getInputProps("width")}
        />
        <NumberInput
          label="d"
          description="Depth of the culvert"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("depth")}
          {...form.getInputProps("depth")}
        />
        <NumberInput
          label="s"
          description="Span of the culvert"
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
          label="t"
          description="Thickness of the culvert"
          min={0.01}
          step={0.01}
          withAsterisk
          allowDecimal
          key={form.key("thickness")}
          {...form.getInputProps("thickness")}
        />
        <NumberInput
          label={
            <>
              <span>c</span>
              <sub>n</sub>
            </>
          }
          description="No of cells"
          min={1}
          key={form.key("noOfCells")}
          {...form.getInputProps("noOfCells")}
        />
        <NumberInput
          label={
            <>
              <span>w</span>
              <sub>a</sub>
            </>
          }
          description="Working allowance"
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

export default RectangularCulvertComponent;
