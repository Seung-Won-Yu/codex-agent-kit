# Example: Empty state refactor

Empty states are one of the easiest places to fail Krug's "no dead ends" rule. A blank pane or a bare "No results" tells the user nothing about *why* it's empty or *what to do next*.

## Before

```tsx
export function AppointmentsList({ appointments, isLoading, error }: Props) {
  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  if (appointments.length === 0) {
    return <p>No appointments.</p>;
  }

  return (
    <ul>
      {appointments.map((a) => <AppointmentRow key={a.id} appointment={a} />)}
    </ul>
  );
}
```

## After

```tsx
export function AppointmentsList({ appointments, isLoading, error, refetch }: Props) {
  if (isLoading) {
    return <PageState variant="loading" title="Loading appointments…" />;
  }

  if (error) {
    return (
      <PageState
        variant="error"
        title="Couldn't load appointments"
        description="Check your connection and try again."
        action={<Button onClick={refetch}>Retry</Button>}
      />
    );
  }

  if (appointments.length === 0) {
    return (
      <PageState
        variant="empty"
        title="No appointments yet"
        description="Schedule your first appointment to start tracking visits."
        action={<Button onClick={openNewAppointment}>New appointment</Button>}
      />
    );
  }

  return (
    <ul className="divide-y">
      {appointments.map((a) => <AppointmentRow key={a.id} appointment={a} />)}
    </ul>
  );
}
```

**UX Improvements:**

- Replaced bare `No appointments.` with `PageState` → empty state now explains *why* and offers a clear next action (Krug: no dead ends).
- Replaced raw `Error: {error.message}` with structured error state including a Retry CTA → user has a path forward, not a wall.
- Replaced silent `<Spinner />` with labeled loading state → user knows *what* is loading, not just *that* something is.
- Used DS `PageState` consistently across all three states → predictable layout, accessible by default, easier to scan.
- Surfaced primary CTAs (`New appointment`, `Retry`) inline with the state → user doesn't have to hunt the rest of the page.
