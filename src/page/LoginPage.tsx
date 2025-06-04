import { ArrowLeftCircle } from "lucide-react"

import { LoginForm } from "@/components/login-form";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-medium">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <ArrowLeftCircle className="size-8" />
            </div>
            Página inicial
          </NavLink>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"><defs><pattern id=":S1:" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" x="0" y="0"><circle id="pattern-circle" cx="1" cy="1" r="1"></circle></pattern></defs><rect width="100%" height="100%" stroke-width="0" fill="url(#:S1:)"></rect></svg>            
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/10241279.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
