const Dashboard = () => {
  return (
    <div className="w-full bg-white shadow rounded-lg overflow-hidden ">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Province ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Province Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Dashboard;
