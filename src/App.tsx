import { Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './data/StoreContext'
import { AuthLayout } from './layouts/AuthLayout'
import { MainLayout } from './layouts/MainLayout'
import { PhoneFrame } from './components/PhoneFrame'
import { LandingPage } from './screens/auth/LandingPage'
import { SignInPage } from './screens/auth/SignInPage'
import { SignUpPage } from './screens/auth/SignUpPage'
import { ForgotPasswordPage } from './screens/auth/ForgotPasswordPage'
import { ChangePasswordPage } from './screens/auth/ChangePasswordPage'
import { HomePage } from './screens/main/HomePage'
import { AccountPage } from './screens/main/AccountPage'
import { CardsPage } from './screens/main/CardsPage'
import { TransactionReportPage } from './screens/main/TransactionReportPage'
import { PlaceholderPage, TransactionHistoryPage } from './screens/main/TransactionHistoryPage'
import { TransferContactsPage } from './screens/transfer/TransferContactsPage'
import { TransferAmountPage } from './screens/transfer/TransferAmountPage'
import { TransferConfirmPage } from './screens/transfer/TransferConfirmPage'
import { TransferSuccessPage } from './screens/transfer/TransferSuccessPage'

function TransferConfirmRoute() {
  return <TransferConfirmPage />
}

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<AuthLayout><LandingPage /></AuthLayout>} />
        <Route path="/signin" element={<AuthLayout><SignInPage /></AuthLayout>} />
        <Route path="/signup" element={<AuthLayout><SignUpPage /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
        <Route path="/change-password" element={<AuthLayout><ChangePasswordPage /></AuthLayout>} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/report" element={<TransactionReportPage />} />
          <Route path="/history" element={<TransactionHistoryPage />} />
          <Route path="/transfer" element={<TransferContactsPage />} />
          <Route path="/transfer/amount" element={<TransferAmountPage />} />
          <Route path="/transfer/confirm" element={<TransferConfirmRoute />} />
          <Route path="/search" element={<PlaceholderPage title="Search" />} />
          <Route path="/messages" element={<PlaceholderPage title="Messages" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/withdraw" element={<PlaceholderPage title="Withdraw" />} />
          <Route path="/recharge" element={<PlaceholderPage title="Mobile Recharge" />} />
          <Route path="/paybill" element={<PlaceholderPage title="Pay Bill" />} />
        </Route>

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </StoreProvider>
  )
}
