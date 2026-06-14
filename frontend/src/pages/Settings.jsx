import Navbar from "../components/layout/Navbar";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function Settings() {
  return (
    <>
      <Navbar />
      <DashboardLayout>
        <div className="mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Settings
          </h2>
          <p className="text-gray-600">
            Manage your dashboard preferences
          </p>
        </div>

        <div className="space-y-6">
          <section className="card-base p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notifications
            </h3>
            <label className="flex items-center justify-between gap-4">
              <span className="text-gray-700 text-sm">
                Email me when a task status changes
              </span>
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
            </label>
          </section>

          <section className="card-base p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Display
            </h3>
            <label className="flex items-center justify-between gap-4">
              <span className="text-gray-700 text-sm">
                Show completed tasks on the dashboard
              </span>
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
            </label>
          </section>

          <section className="card-base p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              API Connection
            </h3>
            <p className="text-gray-600 text-sm">
              Backend server:{" "}
              <span className="font-mono text-gray-800">
                {import.meta.env.VITE_API_URL || "http://localhost:5000"}
              </span>
            </p>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}
