
'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chrome, Smartphone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { RecaptchaVerifier } from 'firebase/auth';

type LoginMode = 'email' | 'phone';

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const { login, setupRecaptcha, signInWithPhone, confirmPhoneSignIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [verifier, setVerifier] = useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        setupRecaptcha('recaptcha-container-login').then(setVerifier);
    }
  }, [setupRecaptcha]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      router.push('/account');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!verifier) {
        toast({ title: "Recaptcha not initialized", variant: "destructive" });
        setIsLoading(false);
        return;
    }
    try {
      await signInWithPhone(phoneNumber, verifier);
      setOtpSent(true);
      toast({ title: "OTP Sent", description: "Please enter the code sent to your phone." });
    } catch (error: any) {
       toast({ title: "Failed to send OTP", description: error.message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleOtpConfirm = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          await confirmPhoneSignIn(otp);
          router.push('/account');
      } catch (error: any) {
          toast({ title: "Invalid OTP", description: error.message, variant: "destructive" });
      } finally {
          setIsLoading(false);
      }
  }


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
       <div id="recaptcha-container-login"></div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            {mode === 'email' ? 'Enter your email and password to login.' : 'Enter your phone number to receive an OTP.'}
          </CardDescription>
        </CardHeader>
        
        {mode === 'email' ? (
             <form onSubmit={handleEmailLogin}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login with Email'}
                    </Button>
                </CardContent>
            </form>
        ) : !otpSent ? (
            <form onSubmit={handlePhoneLogin}>
                <CardContent className="grid gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 650 555 1234" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                     <Button type="submit" className="w-full" disabled={isLoading || !verifier}>
                        {isLoading ? 'Sending OTP...' : 'Login with Phone'}
                    </Button>
                </CardContent>
            </form>
        ) : (
             <form onSubmit={handleOtpConfirm}>
                <CardContent className="grid gap-4">
                     <div className="grid gap-2">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <Input id="otp" type="text" placeholder="123456" required value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                     <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Verifying...' : 'Confirm OTP & Login'}
                    </Button>
                </CardContent>
            </form>
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
                <Button variant="outline" className="w-full" onClick={() => { setMode('email'); setOtpSent(false); }}>
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
