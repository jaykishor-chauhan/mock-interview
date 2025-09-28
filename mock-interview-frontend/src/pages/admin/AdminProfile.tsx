import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const AdminProfile = () => {
  const [name, setName] = useState("Admin User");
  const [email] = useState("admin@example.com");
  const [bio, setBio] = useState("Administrator of the system");

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>

      <Card className="p-6 bg-white border border-gray-200 rounded-xl">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/admin-avatar.png" alt={name} />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <Button className="w-full">
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminProfile;
