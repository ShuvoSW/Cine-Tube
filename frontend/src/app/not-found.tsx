import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, AlertCircle, Tv } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-purple-600/5 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Illustration */}
          <div className="relative h-[300px] lg:h-[400px] order-2 lg:order-1">
            {/* Main Illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Broken Book Illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-3xl rotate-6 animate-float" />
                <div className="absolute inset-0 bg-gradient-to-br from-background to-muted rounded-3xl -rotate-6 flex items-center justify-center shadow-2xl">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Tv className="h-16 w-16 text-primary/30" />
                      <AlertCircle className="h-8 w-8 text-destructive animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-32 bg-muted rounded-full mx-auto" />
                      <div className="h-2 w-24 bg-muted rounded-full mx-auto" />
                      <div className="h-2 w-20 bg-muted rounded-full mx-auto" />
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center animate-bounce-slow">
                    <span className="text-2xl">404</span>
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center animate-float-slow">
                    <span className="text-xl">?</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="text-center lg:text-left space-y-6 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 lg:mx-0 mx-auto">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">
                Error 404
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="block text-foreground">Page Not</span>
              <span className="block bg-gradient-to-r from-destructive via-red-500 to-destructive bg-clip-text text-transparent">
                Found
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-md lg:mx-0 mx-auto">
              Looks like you&rsquo;ve ventured into uncharted territory. The page you&rsquo;re looking for has gone on an adventure.
            </p>

            {/* Stats/Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm text-muted-foreground">Server: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-sm text-muted-foreground">Page: Missing</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:justify-start gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="h-12 px-8 text-base font-semibold rounded-full bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg transition-all"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Take Me Home
                </Link>
              </Button>
            </div>

            {/* Help Link */}
            <div className="pt-6">
              <p className="text-sm text-muted-foreground">
                Need assistance?{' '}
                <Link 
                  href="/contact" 
                  className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}