export { default as NavigationMenu } from "./NavigationMenu.vue"
export { default as NavigationMenuItem } from "./NavigationMenuItem.vue"
export { default as NavigationMenuList } from "./NavigationMenuList.vue"

// Trigger/Content/Indicator/Viewport/Link existed only as unused shadcn-vue
// scaffold (AppHeader.vue's nav only ever renders NavigationMenu > List >
// Item wrapping a plain Link) and were dropped when this family was rebuilt
// without reka-ui.

// Kept for AppHeader.vue, which still applies this inline alongside its own
// (currently Tailwind-based) classes. The visual styling now lives in
// NavigationMenuItem.vue's own scoped SCSS plus AppHeader's own link classes.
export function navigationMenuTriggerStyle() {
    return "navigation-menu-trigger"
}
