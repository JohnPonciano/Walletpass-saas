"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy, Edit2, Eye, EyeOff, Link, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AddPasswordModal } from "./add-password-modal"

// Sample data - in a real app, this would come from your backend
const passwords = [
  {
    id: 1,
    email: "john@example.com",
    password: "SecurePass123!",
    loginUrl: "https://example.com",
  },
  {
    id: 2,
    email: "jane@gmail.com",
    password: "StrongPassword456@",
    loginUrl: "https://gmail.com",
  },
  {
    id: 3,
    email: "user@github.com",
    password: "GitHubPass789#",
    loginUrl: "https://github.com",
  },
]

export function PasswordGrid() {
  const [revealedPasswords, setRevealedPasswords] = useState<number[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const togglePassword = (id: number) => {
    setRevealedPasswords((current) =>
      current.includes(id) ? current.filter((passId) => passId !== id) : [...current, id],
    )
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Password Manager</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Password
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Login URL</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passwords.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">
                      {revealedPasswords.includes(item.id) ? item.password : "••••••••••"}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => togglePassword(item.id)}
                          >
                            {revealedPasswords.includes(item.id) ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {revealedPasswords.includes(item.id) ? "Hide password" : "Show password"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => copyToClipboard(item.password)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy password</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>
                  <a
                    href={item.loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline text-blue-500"
                  >
                    {item.loginUrl}
                    <Link className="ml-1 h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-blue-500">
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddPasswordModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}

