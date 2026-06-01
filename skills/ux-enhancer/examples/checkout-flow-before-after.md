# Example: Checkout / payment step refactor

Checkout is the highest-stakes flow in any product — drop-off here is direct revenue loss. The most common failures: vague CTAs, hidden total, generic errors, and walls of instructional copy that erode trust at the moment the user is about to spend money.

## Before

```tsx
export function CheckoutPaymentStep({ cart, onPay }: Props) {
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });
  const [billingSame, setBillingSame] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    try {
      await onPay({ card, billingSame });
    } catch (e) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2>Payment</h2>
      <p>
        Please enter your payment information below. Make sure your card details
        are correct before clicking the continue button. We accept all major
        credit cards. Your payment will be processed securely.
      </p>

      {error && <div className="text-red-500">{error}</div>}

      <div>
        <label>Card number</label>
        <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />

        <label>Expiry</label>
        <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} />

        <label>CVC</label>
        <input value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} />
      </div>

      <div>
        <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} />
        <label>Billing address same as shipping</label>
      </div>

      <div>
        <p>Subtotal: €{cart.subtotal}</p>
        <p>Shipping: €{cart.shipping}</p>
        <p>Tax: €{cart.tax}</p>
        <p>Total: €{cart.total}</p>
      </div>

      <button disabled={loading} onClick={submit}>
        {loading ? 'Loading...' : 'Continue'}
      </button>
    </div>
  );
}
```

Problems:

- `Continue` button hides the consequence — user doesn't know they're about to be charged.
- Total is buried at the bottom in equal-weight text.
- Instructional paragraph ("Please enter your payment information...") adds reading load at the moment trust matters most.
- Generic `An error occurred` — gives the user no path forward.
- `Loading...` button label gives no context.
- No order-summary structure — payment, billing, total all flow into one column.
- No security/trust hint — checkouts that don't visually signal "secure" lose conversions.
- Card number input has no formatting hint, no autocomplete attributes.
- Disabled button on missing fields would be silent — user can't tell why.

## After

```tsx
export function CheckoutPaymentStep({ cart, onPay }: Props) {
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });
  const [billingSame, setBillingSame] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ title: string; description: string } | null>(null);

  const isValid = card.number.length >= 12 && card.expiry.length === 5 && card.cvc.length >= 3;

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      await onPay({ card, billingSame });
    } catch (e) {
      setError({
        title: 'Payment failed',
        description: e.code === 'card_declined'
          ? 'Your card was declined. Try a different card or contact your bank.'
          : 'We couldn\'t complete the payment. Try again, or contact support if it persists.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
      {/* LEFT: payment form */}
      <section aria-labelledby="payment-title">
        <Typography id="payment-title" variant="h2">Payment</Typography>
        <Typography variant="muted" className="mt-1 flex items-center gap-1">
          <LockIcon size={14} aria-hidden /> Secured by Stripe · 256-bit encryption
        </Typography>

        {error && (
          <FormErrorBanner title={error.title} className="mt-4">
            {error.description}
          </FormErrorBanner>
        )}

        <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="mt-6 space-y-4">
          <Field
            label="Card number"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 1234 1234 1234"
            value={card.number}
            onChange={(v) => setCard({ ...card, number: v })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Expiry"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(v) => setCard({ ...card, expiry: v })}
              required
            />
            <Field
              label="CVC"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="3 digits"
              value={card.cvc}
              onChange={(v) => setCard({ ...card, cvc: v })}
              required
            />
          </div>

          <Checkbox
            checked={billingSame}
            onChange={setBillingSame}
            label="Use shipping address for billing"
          />

          <ButtonLoading
            type="submit"
            loading={loading}
            disabled={!isValid}
            disabledHint={!isValid ? 'Fill all card fields to continue' : undefined}
            className="w-full"
          >
            Pay €{cart.total.toFixed(2)}
          </ButtonLoading>
        </form>
      </section>

      {/* RIGHT: order summary */}
      <aside aria-labelledby="summary-title" className="lg:sticky lg:top-6 h-fit">
        <Card>
          <CardHeader>
            <Typography id="summary-title" variant="h3">Order summary</Typography>
          </CardHeader>
          <CardContent className="space-y-2">
            <SummaryRow label="Subtotal"  value={cart.subtotal} />
            <SummaryRow label="Shipping"  value={cart.shipping} />
            <SummaryRow label="Tax"       value={cart.tax} />
            <Divider />
            <SummaryRow label="Total" value={cart.total} emphasis />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
```

## What improved

- **Button states the verb + amount**: `Continue` → `Pay €24.99`. The user sees exactly what happens and how much (Krug: pages should be self-evident; clickable looks clickable).
- **Total surfaced in a sticky summary card**, not buried in a flat list. The most important number is now the most prominent (Krug: visual hierarchy).
- **Deleted instructional paragraph** about entering payment info — the form is self-evident. Replaced with a tiny security hint where trust signal matters (Krug: omit needless words; reservoir of goodwill).
- **Specific error message** with title + actionable description (`card_declined` vs generic) → user has a path forward (Krug: no dead ends).
- **Disabled button now explains why** via `disabledHint` (`Fill all card fields to continue`) → no silent disabled state.
- **Added `autoComplete` attributes** (`cc-number`, `cc-exp`, `cc-csc`) → browser autofill + password manager support → measurable conversion improvement on real checkouts.
- **Added `inputMode="numeric"`** → mobile keyboard shows numeric pad immediately → tap-target / mobile UX.
- **Trust signal** ("Secured by Stripe · 256-bit encryption") placed where it's read, not buried in footer → conversions on payment forms are sensitive to perceived security.
- **Two-column layout** separates payment form from order summary → clear grouping (Krug: group related, separate unrelated).
- **Semantic landmarks** (`aria-labelledby`, `<section>`, `<aside>`) → screen-reader navigation matches visual structure.
