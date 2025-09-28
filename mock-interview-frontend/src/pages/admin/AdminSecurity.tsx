import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AdminSecurity = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    // API call for password change
    console.log({ oldPassword, newPassword });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900">Security</h1>

      <Card className="p-6 bg-white border border-gray-200 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <Input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleChangePassword}>
          Update Password
        </Button>
      </Card>
    </div>
  );
};

export default AdminSecurity;
