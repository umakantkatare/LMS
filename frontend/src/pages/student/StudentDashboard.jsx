import PageHeader from "@/components/dashboard/PageHeader";
import InfoSectionCard from "@/components/dashboard/InfoSectionCard";
import { info, location } from "@/constants/studentProfileData";
import DashboardLayout from "@/layouts/DashboardLayout";
import useAuth from "@/hooks/useAuth";

export default function StudentProfileDashboard() {
  const { user } = useAuth();
  console.log('data:', user);
  return (
    <DashboardLayout>
      <main className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
        <PageHeader />

        <InfoSectionCard
          title="Contact Details"
          type="contact"
          columns="lg:grid-cols-3"
          data={user}
          bio
        />
      </main>
    </DashboardLayout>
  );
}
