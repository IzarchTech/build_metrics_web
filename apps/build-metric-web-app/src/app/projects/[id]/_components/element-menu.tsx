import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MenuButton from "@/components/ui/menu-button";

function ElementMenu() {
  return (
    <Card className="m-auto w-full md:max-w-md mx-2 md:mx-auto">
      <CardHeader>
        <CardTitle>Choose Element</CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 min-h-40 flex items-center">
        <div className="grid grid-cols-3 gap-2 w-full">
          <MenuButton text="Beam" />
          <MenuButton text="Column" />
          <MenuButton text="Culvert" />
          <MenuButton text="Drain" />
        </div>
      </CardContent>
    </Card>
  );
}

export default ElementMenu;
