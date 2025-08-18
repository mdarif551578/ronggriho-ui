
'use client'

import { useState, FormEvent, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, clientFirestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { User as AppUser } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const userDoc = await getDoc(doc(clientFirestore, 'users', user.uid));
                if (userDoc.exists() && userDoc.data().role === 'admin') {
                    router.push('/admin');
                }
            }
        };
        if (!authLoading) {
            checkAdmin();
        }
    }, [user, authLoading, router]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = userCredential.user;

            const userDocRef = doc(clientFirestore, 'users', loggedInUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists() && (userDocSnap.data() as AppUser).role === 'admin') {
                router.push('/admin');
            } else {
                setError('You do not have permission to access the admin panel.');
                await auth.signOut(); // Sign out non-admin user
            }
        } catch (err: any) {
             switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError('Invalid email or password.');
                    break;
                default:
                    setError('An unexpected error occurred.');
                    console.error(err);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
                    <CardDescription>
                        Enter your admin credentials to access the panel.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="admin@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <Button type="submit" className="w-full" disabled={loading || authLoading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
