import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Zap, Radio } from "lucide-react"
import { Appbar } from "./components/Appbar"
import { Redirect } from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
           <Appbar/>
           <Redirect/>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-24 xl:py-32 bg-blue-600 dark:bg-blue-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Let Your Fans Choose the Music
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl dark:text-blue-200">
                  FanTune: The revolutionary platform where creators and fans collaborate on the perfect stream soundtrack.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">Get Started</Button>
                <Button variant="outline" className="text-blue-600 border-white hover:bg-blue-700">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-600 dark:text-blue-400">Key Features</h2>
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
              <div className="flex flex-col items-center space-y-2 border border-blue-200 dark:border-blue-800 p-6 rounded-lg bg-blue-50 dark:bg-blue-900 flex-1">
                <Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Fan Interaction</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300 text-center">
                  Engage your audience by letting them choose the music for your stream.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-blue-200 dark:border-blue-800 p-6 rounded-lg bg-blue-50 dark:bg-blue-900 flex-1">
                <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Real-time Voting</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300 text-center">
                  Fans vote on songs in real-time, creating a dynamic playlist.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-blue-200 dark:border-blue-800 p-6 rounded-lg bg-blue-50 dark:bg-blue-900 flex-1">
                <Radio className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">Seamless Integration</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300 text-center">
                  Easily integrate with popular streaming platforms and music services.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 dark:bg-blue-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Ready to Transform Your Streams?</h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-blue-200">
                  Join FanTune today and start creating interactive, fan-driven music experiences.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-white dark:bg-gray-800" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-100">Sign Up</Button>
                </form>
                <p className="text-xs text-blue-100 dark:text-blue-200">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2 hover:text-white" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-900">
        <p className="text-xs text-blue-600 dark:text-blue-400">© 2024 FanTune. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}