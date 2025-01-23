export function formatCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatCategoryToSlug(category: string): string {
  return category.replace(/_/g, "-").toLowerCase();
}
