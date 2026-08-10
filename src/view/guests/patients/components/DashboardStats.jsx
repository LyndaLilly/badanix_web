import WalletOverview from "./WalletOverview";
import CompletedAppointments from "./CompletedAppointments";
import PendingAppointments from "./PendingAppointments";

export default function DashboardStats({ wallet, stats }) {
  return (
    <div className="row g-3 mt-2">

      <div className="col-lg-4 col-md-6">
        <WalletOverview wallet={wallet} />
      </div>

      <div className="col-lg-4 col-md-6">
        <CompletedAppointments stats={stats} />
      </div>

      <div className="col-lg-4 col-md-12">
        <PendingAppointments stats={stats} />
      </div>

    </div>
  );
}