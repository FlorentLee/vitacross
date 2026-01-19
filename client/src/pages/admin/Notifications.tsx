import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminNotifications() {
  const [message, setMessage] = useState("Subscribe to vitacross@163.com to get the latest offers and consultation updates");

  const handleSave = () => {
    // In a real app, this would update the backend config
    toast.success("Subscription reminder message updated");
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Subscription Popup</CardTitle>
          <CardDescription>Manage the mandatory popup message shown to new users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Popup Message</Label>
            <Textarea 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              rows={4}
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
