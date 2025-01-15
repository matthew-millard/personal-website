interface ListItemProps {
  label?: string;
  description: string;
}

export default function ListItem({ label, description }: ListItemProps) {
  return (
    <li>
      <span aria-labelledby="item-label" aria-describedby="item-description">
        <strong id="item-label" className="mr-2 font-semibold text-color">
          {label}
        </strong>
        <span id="item-description" className="text-color-muted">
          {description}
        </span>
      </span>
    </li>
  );
}
