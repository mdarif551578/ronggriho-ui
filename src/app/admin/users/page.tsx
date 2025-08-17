
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const users = [
    { id: "USR001", name: "Liam Johnson", email: "liam@example.com", role: "Customer", joined: "2023-01-15" },
    { id: "USR002", name: "Olivia Smith", email: "olivia@example.com", role: "Customer", joined: "2023-02-20" },
    { id: "USR003", name: "Noah Williams", email: "noah@example.com", role: "Customer", joined: "2023-03-10" },
    { id: "USR004", name: "Admin User", email: "admin@example.com", role: "Admin", joined: "2023-01-01" },
];

export default function AdminUsersPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Users</h1>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="hidden md:table-cell">Role</TableHead>
                                <TableHead className="hidden md:table-cell">Joined Date</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="hidden md:table-cell">{user.role}</TableCell>
                                    <TableCell className="hidden md:table-cell">{user.joined}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Make Admin</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
