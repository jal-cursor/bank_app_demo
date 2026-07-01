# Transfer / Money-Movement Flow

A comprehensive report on how the peer-to-peer money transfer feature works in
`bank_app_demo`.

## Executive summary

The transfer feature is a three-screen wizard that lets a user pick a contact,
enter an amount, choose a source card, and see a success confirmation. All state
for an in-progress transfer lives in a single `transferDraft` object held in the
app-wide React context store (`StoreContext`). There is no backend and no real
money movement: contacts, cards, and balances come from static mock data in
`src/data/mock.ts`, and pressing **Send** simply navigates to a success screen
without mutating any balances or transaction history.

The flow is currently being edited. A pending (uncommitted) change to
`TransferConfirmPage.tsx` converts the amount from a read-only display into an
editable text input with preset amount chips, wired to a new `setTransferAmount`
store action. This report documents the flow as it exists with that change
applied, and calls out gaps and risks at the end.

- **Entry point:** Home screen "Transfer" quick action → `/transfer`
- **Screens:** `TransferContactsPage` → `TransferConfirmPage` → `TransferSuccessPage`
- **State owner:** `StoreProvider` / `useStore()` in `src/data/StoreContext.tsx`
- **Data source:** static mocks in `src/data/mock.ts`
- **Persistence:** none (in-memory React state only; lost on refresh)

## Background / context

`bank_app_demo` is a Vite + React + React Router single-page app that renders a
mobile banking UI inside a phone frame. Routing is defined centrally in
`src/App.tsx`. Screens read and write shared state through a single React context
store rather than a dedicated state library like Redux or Zustand.

The transfer feature is one of several "category" actions surfaced on the home
screen. It is the most stateful flow in the app because it spans multiple screens
that must share a partially-built transfer (the "draft").

## The end-to-end flow

### Step 0 — Entry

The Home screen (`src/screens/main/HomePage.tsx`) lists category tiles. The
"Transfer" tile links to `/transfer`:

```16:18:src/screens/main/HomePage.tsx
  { label: 'Account and Card', icon: <WalletIcon />, to: '/account' },
  { label: 'Transfer', icon: <TransferIcon />, to: '/transfer' },
  { label: 'Withdraw', icon: <WithdrawIcon />, to: '/withdraw' },
```

### Step 1 — Pick a contact (`/transfer`)

`TransferContactsPage` renders a searchable list of contacts from the store. It
filters `contacts` by a local `query` state, and on selection it writes the
contact id into the draft and navigates to the confirm screen:

```32:41:src/screens/transfer/TransferContactsPage.tsx
        {filtered.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            onSelect={() => {
              setTransferContact(contact.id)
              navigate('/transfer/confirm')
            }}
          />
        ))}
```

Note the search filter matches only on `name` (case-insensitive substring); it
does not match on masked card number.

### Step 2 — Confirm amount and source (`/transfer/confirm`)

`TransferConfirmPage` is the heart of the flow. It:

1. Reads the draft and resolves the selected `contact` and `sourceCard` via
   `getContact` / `getCard`.
2. Guards the route: if no contact is set (e.g. the user deep-links or refreshes),
   it redirects back to `/transfer`.
3. Renders the contact header, an **editable amount field**, preset amount chips,
   a source-account selector, and a **Send** button.

Route guard:

```29:31:src/screens/transfer/TransferConfirmPage.tsx
  if (!contact) {
    return <Navigate to="/transfer" replace />
  }
```

**Amount entry (pending change).** The amount is now an editable input backed by
local `amountText` state plus the shared draft. Every keystroke is sanitized to
digits and a decimal point, mirrored into local state for display, and parsed to
a number pushed into the store:

```33:42:src/screens/transfer/TransferConfirmPage.tsx
  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^0-9.]/g, '')
    setAmountText(sanitized)
    setTransferAmount(parseAmount(sanitized))
  }

  const selectPreset = (preset: number) => {
    setAmountText(String(preset))
    setTransferAmount(preset)
  }
```

Preset chips (`AMOUNT_PRESETS = [50, 100, 320, 500]`) render via the reusable
`AmountChip` component and highlight when the draft amount matches the preset
exactly. `parseAmount` falls back to `0` for non-finite input.

**Source account.** The source card selector is currently hard-coded to always
set card `c2` on click, with fallback display values if `sourceCard` is missing:

```78:93:src/screens/transfer/TransferConfirmPage.tsx
        <button
          type="button"
          onClick={() => setSourceCard('c2')}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-card-soft"
        >
          <div className="flex items-center gap-4">
            <MastercardMark />
            <div className="text-left">
              <p className="text-sm font-semibold">{sourceCard?.numberMasked ?? '**** 2236'}</p>
              <p className="text-xs text-neutral">
                Balance: {formatMoney(sourceCard?.balance ?? 5300)}
              </p>
            </div>
          </div>
          <ChevronDownIcon size={20} className="text-neutral" />
        </button>
```

**Send.** The Send button does not validate or execute anything; it navigates
straight to the success screen:

```96:98:src/screens/transfer/TransferConfirmPage.tsx
      <div className="mt-auto pb-6">
        <Button onClick={() => navigate('/transfer/success')}>Send</Button>
      </div>
```

### Step 3 — Success (`/transfer/success`)

`TransferSuccessPage` reads the draft to display the amount and the recipient's
first name, then offers "Back to Home" (which calls `resetTransfer()` and
navigates home) or "View history":

```17:19:src/screens/transfer/TransferSuccessPage.tsx
      <h2 className="text-xl font-semibold leading-snug text-slate-900">
        {formatMoney(transferDraft.amount)} has been sent to {name}!
      </h2>
```

This route is defined outside `MainLayout`, wrapped directly in a `PhoneFrame`,
so it renders as a full-screen confirmation without the main navigation chrome:

```50:59:src/App.tsx
        <Route
          path="/transfer/success"
          element={
            <PhoneFrame>
              <div className="h-full bg-app-bg">
                <TransferSuccessPage />
              </div>
            </PhoneFrame>
          }
        />
```

## State & data layer

### The draft model

The entire transfer is represented by one small type:

```67:71:src/types.ts
export interface TransferDraft {
  contactId: string | null
  amount: Money
  sourceCardId: string | null
}
```

Its default seeds a non-empty amount and a default source card, which is why the
confirm screen shows `320` and card `c2` before the user touches anything:

```100:104:src/data/mock.ts
export const defaultTransferDraft: TransferDraft = {
  contactId: null,
  amount: 320,
  sourceCardId: 'c2',
}
```

### Store actions

`StoreProvider` holds `transferDraft` in `useState` and exposes four mutators,
each doing an immutable partial update, plus lookup helpers:

```45:59:src/data/StoreContext.tsx
  const setTransferContact = useCallback((contactId: string) => {
    setTransferDraft((d) => ({ ...d, contactId }))
  }, [])

  const setTransferAmount = useCallback((amount: number) => {
    setTransferDraft((d) => ({ ...d, amount }))
  }, [])

  const setSourceCard = useCallback((cardId: string) => {
    setTransferDraft((d) => ({ ...d, sourceCardId: cardId }))
  }, [])

  const resetTransfer = useCallback(() => {
    setTransferDraft(defaultTransferDraft)
  }, [])
```

`getContact` and `getCard` look up records directly from the mock arrays
(`mockContacts`, `mockCards`), independent of the reactive store state.

### Data flow diagram

```
HomePage ──/transfer──▶ TransferContactsPage
                              │ setTransferContact(id)
                              ▼
                        TransferConfirmPage ──setTransferAmount()──▶ store.transferDraft
                              │ setSourceCard('c2')
                              │ navigate('/transfer/success')
                              ▼
                        TransferSuccessPage ──resetTransfer()──▶ default draft
```

## Analysis & implications

### What the pending change accomplishes

- Turns a static amount label into a real editable field with input sanitization.
- Adds quick-select preset chips wired to the same store action.
- Introduces `setTransferAmount` into the confirm screen's store bindings.

The dual-source-of-truth pattern (local `amountText` for display + store `amount`
for logic) is reasonable here: it lets the input hold intermediate text like
`"1."` while the store keeps a parsed number.

### Gaps and risks

1. **No real execution.** Send performs no validation, no balance check, and no
   write to transactions or balances. Balances in `mock.ts` are static; the
   success screen's message is cosmetic.
2. **Hard-coded source card.** The account selector always sets `c2` and cannot
   actually choose among `c1`/`c2`/`c3`, despite the chevron implying a picker.
3. **No amount validation.** `0`, empty, or amounts exceeding the card balance
   are all accepted; the user can "send" `$0.00`.
4. **Decimal parsing edge cases.** `parseAmount` strips all but digits and dots
   but does not collapse multiple dots (e.g. `"1.2.3"` parses to `1.2`, while the
   visible text keeps `"1.2.3"`), so display and stored value can diverge.
5. **Preset highlight vs. typed value.** Chips highlight only on exact numeric
   equality with the draft, so typing `50.00` won't light up the `$50` chip.
6. **State persistence.** The draft is in-memory only. A refresh on
   `/transfer/confirm` resets the contact to `null`, triggering the redirect back
   to `/transfer`.
7. **Dead indirection.** `TransferConfirmRoute` in `App.tsx` is a passthrough
   wrapper that adds nothing over rendering `TransferConfirmPage` directly.

## Conclusions & recommended next steps

The transfer flow is a clean, well-scoped UI demo: a shared draft threaded
through three screens via a context store. The in-progress edit meaningfully
improves the confirm step by making the amount interactive.

To move it toward a realistic feature:

- Implement an actual `executeTransfer()` store action that validates the amount
  against the source card balance, decrements the balance, and appends a
  `Transaction` record, then have Send call it.
- Make the source-account selector a real picker over the user's cards.
- Add amount validation and disable Send for invalid/zero/over-balance amounts.
- Harden `parseAmount` to enforce a single decimal point and keep display and
  stored value consistent.
- Consider persisting the draft (or at least guarding navigation) so a refresh
  mid-flow doesn't silently discard progress.

## Source references

- `src/screens/main/HomePage.tsx` — entry point tile
- `src/screens/transfer/TransferContactsPage.tsx` — contact selection
- `src/screens/transfer/TransferConfirmPage.tsx` — amount + source + send (edited)
- `src/screens/transfer/TransferSuccessPage.tsx` — confirmation
- `src/data/StoreContext.tsx` — draft state and mutators
- `src/data/mock.ts` — contacts, cards, default draft
- `src/types.ts` — `TransferDraft` and related types
- `src/components/AmountChip.tsx` — preset chip component
- `src/lib/format.ts` — `formatMoney`
- `src/App.tsx` — routing
