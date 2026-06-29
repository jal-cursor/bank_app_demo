import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'

export function LandingPage() {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-primary-light to-primary-violet">
      <div className="flex flex-1 flex-col items-center justify-end px-8 pb-32 pt-16 text-white">
        <div className="mb-8 flex h-48 w-48 items-center justify-center rounded-full bg-white/10">
          <div className="h-32 w-32 rounded-full bg-white/20" />
        </div>
        <h1 className="text-3xl font-semibold">Jane Cooper</h1>
        <p className="mt-4 text-center text-sm opacity-80">
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
        <Link to="/signin">
          <Button state="active">Get Started</Button>
        </Link>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="font-semibold underline">
            Sign in
          </Link>
        </p>
      </div>
      <div className="pointer-events-none absolute -bottom-2 left-0 right-0 h-28 gradient-primary opacity-90 [clip-path:ellipse(80%_100%_at_50%_100%)]" />
    </div>
  )
}
