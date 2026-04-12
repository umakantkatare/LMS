import React from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth?.data);

  const user = data || {};

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
          {/* Header */}
          <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatar?.secure_url} />
              <AvatarFallback className="text-xl">
                {user?.fullName?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left space-y-2">
              <CardTitle className="text-2xl font-semibold">
                {user?.fullName}
              </CardTitle>

              <p className="text-sm text-muted-foreground">{user?.email}</p>

              <Badge
                variant={user?.role === "ADMIN" ? "destructive" : "secondary"}
                className="mt-1"
              >
                {user?.role}
              </Badge>
            </div>

            <div
              className="md:ml-auto"
              onClick={() => navigate("/user/edit-profile")}
            >
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardHeader>

          <Separator />

          {/* Body */}
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Account Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Account Info</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Full Name</span>
                <span>{user?.fullName}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span>{user?.email}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Role</span>
                <span>{user?.role}</span>
              </div>
            </div>

            {/* Subscription Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Subscription</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={
                    user?.subscription?.status === "active"
                      ? "default"
                      : "secondary"
                  }
                >
                  {user?.subscription?.status || "Not Subscribed"}
                </Badge>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subscription ID</span>
                <span>{user?.subscription?.id || "N/A"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Joined</span>
                <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
};

export default Profile;
