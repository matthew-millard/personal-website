import React from "react";
import ListItem from "./ListItem";

export default function OrderedList({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol {...props} className="list-decimal pl-4 text-color">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === "li" ? (
          <ListItem {...child.props} className="mt-3">
            {child.props.children}
          </ListItem>
        ) : (
          child
        ),
      )}
    </ol>
  );
}
