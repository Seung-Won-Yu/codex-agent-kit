# Example: Search + filter toolbar refactor

Search/filter UIs fail when they don't show what's currently applied, don't hint at what's searchable, and don't tell the user how many results matched. Users end up confused about *why* they're seeing what they're seeing.

## Before

```tsx
export function PatientsToolbar({ filters, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />

      <select onChange={(e) => onChange({ ...filters, status: e.target.value })}>
        <option value="">Filter</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select onChange={(e) => onChange({ ...filters, range: e.target.value })}>
        <option value="">Filter</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>

      <button onClick={() => onChange({})}>Clear</button>
    </div>
  );
}
```

Problems:

- `Filter` dropdown placeholder is meaningless — what does it filter?
- `Search` placeholder gives no hint at what's searchable.
- No active-filter indicator — user can't see what's applied without inspecting selects.
- `Clear` is ambiguous — clear search? filters? both?
- No result count, no "showing N of M" feedback.

## After

```tsx
export function PatientsToolbar({
  filters,
  onChange,
  onSearch,
  total,
  filteredCount,
}: Props) {
  const activeFilters = getActiveFilters(filters); // [{ key: 'status', label: 'Active' }, …]
  const hasFilters = activeFilters.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <SearchInput
          placeholder="Search by name, email, or ID"
          onChange={onSearch}
          className="flex-1 min-w-[240px]"
        />

        <Select
          label="Status"
          value={filters.status ?? ''}
          onChange={(v) => onChange({ ...filters, status: v })}
          options={[
            { value: '',         label: 'All statuses' },
            { value: 'active',   label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />

        <Select
          label="Date range"
          value={filters.range ?? ''}
          onChange={(v) => onChange({ ...filters, range: v })}
          options={[
            { value: '',    label: 'All time' },
            { value: '7d',  label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
          ]}
        />
      </div>

      <div className="flex items-center justify-between">
        <Typography variant="muted">
          {hasFilters
            ? `Showing ${filteredCount} of ${total} patients`
            : `${total} patients`}
        </Typography>

        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((f) => (
              <Chip
                key={f.key}
                onRemove={() => onChange({ ...filters, [f.key]: undefined })}
              >
                {f.label}
              </Chip>
            ))}
            <Button variant="ghost" size="sm" onClick={() => onChange({})}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

**UX Improvements:**

- Search placeholder now says *what's searchable* (`name, email, or ID`) → user doesn't have to guess (Krug: self-evident).
- Renamed dropdown placeholders from generic `Filter` to the actual filter dimension (`Status`, `Date range`) → the control labels itself.
- Added active-filter chips with individual remove → user sees exactly what's applied and can drop one without resetting all (Krug: where am I?).
- Added result count (`Showing 23 of 412`) → user understands why the list looks the way it does.
- Renamed `Clear` → `Clear filters` and only shows when filters are active → button label states the verb, no dead control when nothing to clear.
- Added explicit "All statuses" / "All time" options → empty filter is now a real choice, not a mystery placeholder.
