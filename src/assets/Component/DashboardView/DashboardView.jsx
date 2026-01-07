import { useEffect, useState, useContext, use } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../../Context/AuthContext";


const DashboardView = () => {
const { user } = useContext(AuthContext);

const isDark = document.documentElement.classList.contains("dark");

  const [products, setProducts] = useState([]);
  const [imports, setImports] = useState([]);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    if (!user?.email) return;

    // fetch products (exports)
    fetch(
      `https://assignment-10-server-six-ivory.vercel.app/products?email=${user.email}`
    )
      .then(res => res.json())
      .then(setProducts);

    // fetch imports
    fetch(
      `https://assignment-10-server-six-ivory.vercel.app/imports?email=${user.email}`
    )
      .then(res => res.json())
      .then(setImports);
  }, [user?.email]);

  // ---------------- STATS ----------------
  const totalExports = products.length;
  const totalImports = imports.length;

  const exportValue = products.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  // ---------------- CHART DATA ----------------

  // Top products by quantity
  const topProducts = products.map(p => ({
    name: p.title,
    quantity: p.available_quantity || 0,
  }));

  // Import activity (last 7 days)
 const importMap = {};


imports.forEach(i => {
  let date;

  // ✅ Prefer createdAt if exists
  if (i.createdAt) {
    date = new Date(i.createdAt);
  } 
  // ✅ Fallback: extract time from MongoDB ObjectId
  else if (i._id) {
    const timestamp = parseInt(i._id.substring(0, 8), 16) * 1000;
    date = new Date(timestamp);
  }

  if (!date || isNaN(date)) return;

  const dayKey = date.toISOString().split("T")[0]; // YYYY-MM-DD

  importMap[dayKey] = (importMap[dayKey] || 0) + 1;
});

const importActivity = Object.keys(importMap)
  .sort()
  .map(day => ({
    day: new Date(day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    imports: importMap[day],
  }));


  const avgRating =
  products.length > 0
    ? (
        products.reduce(
          (total, product) => total + Number(product.rating || 0),
          0
        ) / products.length
      ).toFixed(1)
    : 0;

  return (
    <div className="p-6 bg-[#FFF5EE] min-h-screen dark:bg-gray-800 ">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2 dark:text-gray-300">Dashboard Overview</h1>
      <p className="text-gray-600 mb-6 dark:text-gray-300">
        Welcome back, <span className="font-semibold">{user?.displayName}</span>!
        Here's your trading summary.
      </p>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Exports" value={totalExports} />
        <StatCard title="Total Imports" value={totalImports} />
        <StatCard title="Export Value" value={`$${exportValue}`} />
        <StatCard title="Avg. Rating" value= {avgRating}/>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <ChartCard title="Top Products by Quantity">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topProducts}>
              <XAxis  tick={{ fill: "#d1d5db" }}   // gray-300
  stroke="#4b5563"   dataKey="name" />
              <YAxis  tick={{ fill: "#d1d5db" }}   // gray-300
  stroke="#4b5563" />
              <Tooltip />
              <Bar dataKey="quantity"  fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Import Activity */}
        <ChartCard title="Import Activity (Last 7 Days)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={importActivity}>
              <YAxis
  allowDecimals={false}
  width={40}                  
  tickMargin={8}              
  tick={{ fill: "#d1d5db" }}    
  stroke="#6b7280"            
  tickLine={false}              
/>

<XAxis
  dataKey="day"
  tick={{ fill: "#d1d5db" }}
  stroke="#6b7280"
  tickLine={false}
/>


              <Tooltip />
           <Line
             tick={{ fill: "#d1d5db" }} 
  type="monotone"
  dataKey="imports"
  stroke="#f97316"   
  strokeWidth={3}
  dot={{ r: 4 }}
/>

            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardView;

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm dark:bg-gray-700">
    <p className="text-gray-500 text-sm mb-1 dark:text-gray-300">{title}</p>
    <h2 className="text-3xl font-bold dark:text-gray-300">{value}</h2>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm dark:bg-gray-700">
    <h3 className="font-semibold mb-4 dark:text-gray-300">{title}</h3>
    {children}
  </div>
);
