import React from "react";
import ListItem from "./ListItem";

export default function UnorderedList({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul {...props} className="list-disc space-y-2 pl-4 text-color">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === "li" ? (
          <ListItem {...child.props} className="">
            {child.props.children}
          </ListItem>
        ) : (
          child
        ),
      )}
    </ul>
  );
}
