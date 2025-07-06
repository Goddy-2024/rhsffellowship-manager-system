
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AddMemberDialog } from "./AddMemberDialog";
import { Search, UserPlus, Edit } from "lucide-react";
import { getMembers, addMember, type Member } from "@/utils/localStorage";
import { toast } from "@/components/ui/sonner";

export function MemberManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    setMembers(getMembers());
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (newMemberData: Omit<Member, "id">) => {
    try {
      const newMember = addMember(newMemberData);
      setMembers(getMembers());
      setShowAddDialog(false);
      toast("Member added successfully!");
    } catch (error) {
      toast("Failed to add member. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600 mt-2">
            Manage fellowship members and their information
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members Directory</CardTitle>
          <CardDescription>
            View and manage all fellowship members
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddMemberDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddMember={handleAddMember}
      />
    </div>
  );
}
