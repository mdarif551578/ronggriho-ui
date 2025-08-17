
'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone, Mail } from 'lucide-react';
import { useState } from 'react';

type LoginMode = 'email' | 'phone';

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>('email');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            {mode === 'email' ? 'Enter your email and password to login.' : 'Enter your phone number to login.'}
          </CardDescription>
        </CardHeader>
        
        {mode === 'email' ? (
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login with Email
            </Button>
          </CardContent>
        ) : (
          <CardContent className="grid gap-4">
             <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+880 123 456 7890" required />
            </div>
             <Button type="submit" className="w-full">
                Login with Phone
            </Button>
          </CardContent>
        )}
        
        <div className="relative my-2 px-6">
            <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
                Or
            </span>
            </div>
        </div>

        <CardContent>
            {mode === 'email' ? (
                <Button variant="outline" className="w-full" onClick={() => setMode('phone')}>
                    <Smartphone className="mr-2 h-4 w-4" /> Continue with Phone
                </Button>
            ) : (
                <Button variant="outline" className="w-full" onClick={() => setMode('email')}>
                    <Mail className="mr-2 h-4 w-4" /> Continue with Email
                </Button>
            )}
        </CardContent>

        <CardFooter className="justify-center">
        <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="underline font-medium text-primary">
            Sign up
            </Link>
        </div>
        </CardFooter>
      </Card>
    </div>
  );
}
