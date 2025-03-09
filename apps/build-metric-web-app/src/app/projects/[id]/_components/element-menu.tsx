import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

import beamIcon from "@/assets/element-icons/beam.png";
import bridgeIcon from "@/assets/element-icons/bridge.png";
import columnIcon from "@/assets/element-icons/column.png";
import culvertIcon from "@/assets/element-icons/culvert.png";
import drainIcon from "@/assets/element-icons/drain.png";
import wallIcon from "@/assets/element-icons/wall.png";
import { useRouter } from "next/navigation";

type ElementMenuType = {
  type: "beam" | "bridge" | "column" | "culvert" | "drain" | "wall";
  icon: StaticImageData;
};

const ELEMENT_MENU: ElementMenuType[] = [
  {
    type: "beam",
    icon: beamIcon,
  },
  {
    type: "bridge",
    icon: bridgeIcon,
  },
  {
    type: "column",
    icon: columnIcon,
  },
  {
    type: "culvert",
    icon: culvertIcon,
  },
  {
    type: "drain",
    icon: drainIcon,
  },
  {
    type: "wall",
    icon: wallIcon,
  },
];

type ElementMenuProps = ElementMenuType & {
  disabled?: boolean;
  href: string;
};

function elementTypeToPluralString(type: ElementMenuType["type"]): string {
  switch (type) {
    case "beam":
      return "beams";
    case "bridge":
      return "bridges";
    case "column":
      return "columns";
    case "culvert":
      return "culverts";
    case "drain":
      return "drain";
    case "wall":
      return "walls";
  }
}

/**
 * A component that renders a single menu item for the ElementMenu component.
 * It expects two props: `icon` and `title`.
 *
 * @param {ElementMenuProps} props
 * @prop {StaticImageData} icon
 * @prop {string} title
 * @prop {boolean} disabled
 * @returns {JSX.Element} A single menu item.
 */
function ElementMenuItem({
  icon,
  type: title,
  disabled,
  href,
}: Readonly<ElementMenuProps>): JSX.Element {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="h-20"
      aria-label={`Select ${title}`}
      onClick={() => router.push(href)}
      disabled={disabled}
    >
      <div className="size-10 relative">
        {/* The icon of the menu item */}
        <Image src={icon} alt={`${title} icon`} fill />
      </div>
      {/* The title of the menu item */}
      <span className="text-sm capitalize">{title}</span>
    </Button>
  );
}

/**
 * A component that renders a menu with a list of elements to choose from.
 */
function ElementMenu({ projectId }: Readonly<{ projectId: string }>) {
  return (
    <div className="w-full px-4 space-y-4 mt-6">
      <h6 className="uppercase font-semibold text-sm">Choose Element</h6>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 pb-4 gap-2">
        {ELEMENT_MENU.map((element) => (
          <ElementMenuItem
            key={element.type}
            {...element}
            href={`/projects/${projectId}/${elementTypeToPluralString(element.type)}/new`}
          />
        ))}
      </div>
    </div>
  );
}

export default ElementMenu;
