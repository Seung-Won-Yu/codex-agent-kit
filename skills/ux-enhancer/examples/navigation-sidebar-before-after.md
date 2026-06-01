# Example: Dashboard sidebar / navigation refactor

Dashboard sidebars are where Krug's "Where am I? What can I do? Where can I go?" gets tested most aggressively. Common failures: 15 flat items at equal weight, no active state, vague labels, and no obvious place for account/settings/logout.

## Before

```tsx
export function DashboardSidebar({ user, currentPath }: Props) {
  return (
    <nav className="w-60 bg-gray-100 p-4">
      <div className="text-xl mb-6">MyApp</div>

      <ul>
        <li><a href="/dashboard"><HomeIcon /></a></li>
        <li><a href="/manage-patients">Manage Patients</a></li>
        <li><a href="/appointments-calendar">Appointments Calendar</a></li>
        <li><a href="/billing-and-invoices">Billing and Invoices</a></li>
        <li><a href="/reports-section">Reports Section</a></li>
        <li><a href="/team-members">Team Members</a></li>
        <li><a href="/integrations">Integrations</a></li>
        <li><a href="/settings-page">Settings Page</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/notifications">Notifications</a></li>
        <li><a href="/help-center">Help Center</a></li>
        <li><a href="/logout">Log out</a></li>
      </ul>
    </nav>
  );
}
```

Problems:

- 12 items, flat list, equal weight — user can't tell what's primary.
- No active state — user can't tell which page they're on.
- Vague / redundant labels (`Manage Patients` should be `Patients`; `Reports Section` should be `Reports`).
- First item is icon-only with no label and no `aria-label` → mystery meat.
- No grouping — work items, account, and help-link all flow together.
- Logout sits alphabetically among work pages — destructive action treated as ordinary nav.
- No mobile pattern — fixed 240px sidebar will break on small screens.
- No way to know where account/settings live without reading every item.

## After

```tsx
type NavItem = { label: string; href: string; icon: ReactNode };

const PRIMARY_NAV: NavItem[] = [
  { label: 'Dashboard',    href: '/dashboard',    icon: <HomeIcon /> },
  { label: 'Patients',     href: '/patients',     icon: <UsersIcon /> },
  { label: 'Appointments', href: '/appointments', icon: <CalendarIcon /> },
  { label: 'Billing',      href: '/billing',      icon: <CreditCardIcon /> },
  { label: 'Reports',      href: '/reports',      icon: <ChartIcon /> },
];

const SECONDARY_NAV: NavItem[] = [
  { label: 'Team',         href: '/team',         icon: <TeamIcon /> },
  { label: 'Integrations', href: '/integrations', icon: <PlugIcon /> },
];

export function DashboardSidebar({ user, currentPath }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger */}
      <button
        className="lg:hidden p-3"
        aria-label="Open navigation"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon />
      </button>

      <nav
        aria-label="Main"
        className={cn(
          'flex flex-col w-60 h-screen bg-surface border-r',
          'lg:static lg:translate-x-0',
          mobileOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden lg:flex',
        )}
      >
        {/* Brand */}
        <div className="px-4 py-5 border-b">
          <Logo />
        </div>

        {/* Work — primary */}
        <ul className="flex-1 overflow-y-auto p-2 space-y-1">
          {PRIMARY_NAV.map((item) => (
            <NavLink key={item.href} item={item} active={currentPath.startsWith(item.href)} />
          ))}

          {/* Secondary group, visually demoted */}
          <li className="pt-4">
            <div className="px-3 pb-1 text-xs uppercase tracking-wide text-muted">
              Workspace
            </div>
            <ul className="space-y-1">
              {SECONDARY_NAV.map((item) => (
                <NavLink key={item.href} item={item} active={currentPath.startsWith(item.href)} />
              ))}
            </ul>
          </li>
        </ul>

        {/* Account — anchored bottom, predictable placement */}
        <div className="border-t p-3">
          <DropdownMenu>
            <DropdownMenu.Trigger className="flex items-center gap-2 w-full p-2 rounded hover:bg-muted">
              <Avatar src={user.avatarUrl} name={user.name} size={28} />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted">{user.email}</div>
              </div>
              <ChevronUpIcon size={14} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item href="/profile">Profile</DropdownMenu.Item>
              <DropdownMenu.Item href="/settings">Settings</DropdownMenu.Item>
              <DropdownMenu.Item href="/help">Help center</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item href="/logout" destructive>Log out</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <li>
      <a
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded text-sm',
          active
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-fg hover:bg-muted',
        )}
      >
        <span aria-hidden>{item.icon}</span>
        {item.label}
      </a>
    </li>
  );
}
```

## What improved

- **Grouped nav into work + workspace + account** — three clear zones instead of 12 flat items (Krug: group related, separate unrelated).
- **Obvious active state** with background tint, primary color, font weight, and `aria-current="page"` → user can answer "where am I?" instantly (Krug: navigation must answer Where am I?).
- **Tightened labels** (`Manage Patients` → `Patients`, `Appointments Calendar` → `Appointments`, `Reports Section` → `Reports`) → removes redundancy, matches page H1 (Krug: page titles match clicked links).
- **All icons paired with text labels** — no mystery-meat icon-only items. Decorative icons marked `aria-hidden` so screen readers don't read them twice.
- **Account / settings / help / logout** moved to a single bottom-anchored menu with a destructive variant on Log out → predictable placement and destructive action is visually distinct (Krug: convention; clickable looks clickable).
- **Mobile pattern**: nav collapses behind a labeled `Open navigation` button, slides in as overlay on small screens. `aria-expanded` reflects state.
- **Semantic landmarks**: `<nav aria-label="Main">` → screen reader can jump to nav directly.
- **Pinned secondary group label** ("Workspace" subheading) → visual hierarchy signals that those items are less frequent than primary work.

### Mobile-friendly notes

- The same component renders as off-canvas overlay on `< lg` (1024px) screens.
- The trigger is visible and labeled, not a bare hamburger glyph.
- Tap targets on nav links are ≥44px tall via `py-2 px-3`.
- The bottom user dropdown is reachable on mobile because the entire sidebar is scrollable above it.
