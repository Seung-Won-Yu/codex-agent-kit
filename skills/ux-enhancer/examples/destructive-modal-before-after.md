# Example: Destructive confirmation modal refactor

Destructive actions are one of the highest-stakes UX surfaces. A vague "Are you sure?" with `Yes` / `No` buttons fails on three Krug principles at once: it doesn't state the consequence, doesn't disambiguate the destructive button, and doesn't help the user decide.

## Before

```tsx
export function DeletePatientModal({ open, onClose, onConfirm, patient }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2>Are you sure?</h2>
      <p>This action cannot be undone.</p>

      <div>
        <button onClick={onClose}>No</button>
        <button onClick={onConfirm}>Yes</button>
      </div>
    </Modal>
  );
}
```

Problems:

- Title doesn't say *what* gets deleted.
- Body is generic — doesn't say what's actually destroyed (appointments? notes? billing?).
- Buttons `Yes` / `No` force the user to map back to the question.
- Both buttons styled identically — destructive action isn't visually distinct.
- No keyboard or aria-handling clues.

## After

```tsx
export function DeletePatientModal({ open, onClose, onConfirm, patient, loading }: Props) {
  const dependentCount = patient.appointmentCount + patient.noteCount;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="delete-patient-title">
      <Modal.Header>
        <Typography id="delete-patient-title" variant="h3">
          Delete {patient.firstName} {patient.lastName}?
        </Typography>
      </Modal.Header>

      <Modal.Body>
        <Typography variant="body">
          This permanently deletes their profile, {patient.appointmentCount} appointments,
          and {patient.noteCount} clinical notes.
        </Typography>
        <Typography variant="muted" className="mt-2">
          You can't undo this.
        </Typography>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <ButtonLoading
          variant="destructive"
          loading={loading}
          onClick={onConfirm}
        >
          Delete patient
        </ButtonLoading>
      </Modal.Footer>
    </Modal>
  );
}
```

**UX Improvements:**

- Title states *exactly what* gets deleted, including the patient name → user can decide without re-reading the page (Krug: pages should be self-evident).
- Body lists concrete consequences (appointment count, note count) → user understands the blast radius before confirming, not after.
- Renamed buttons `Yes` / `No` → `Cancel` / `Delete patient` → buttons describe the verb of what happens (Krug: clickable looks clickable, labels match outcome).
- Styled destructive button with `variant="destructive"` → visual weight matches consequence (Krug: visual hierarchy beats decoration).
- Promoted Cancel as ghost, destructive as primary-style red → user can't accidentally tap the wrong one with similar weights.
- Added pending state via `ButtonLoading` → user gets feedback during the async deletion instead of double-clicking.
- Added `aria-labelledby` → modal has a programmatic title for screen readers.
