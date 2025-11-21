import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { getPoolData, getPoolMetrics } from "../lib/blockfrost";

const POOL_ID =
  "610a0c8d254e6613963b00dbba1f92ad1d1caf8b6566f636e7d68bc6";

export default function LivePoolStats() {
  const [data, setData] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        console.log("Loading pool data for:", POOL_ID);
        console.log("API Key configured:", !!import.meta.env.VITE_BLOCKFROST_KEY);
        
        const pool = await getPoolData(POOL_ID);
        let met = await getPoolMetrics(POOL_ID);

        console.log("Pool data:", pool);
        console.log("Pool metrics:", met);
        console.log("Available pool data fields:", pool ? Object.keys(pool) : []);

        // If metrics endpoint fails, try to extract from pool data or use defaults
        if (pool) {
          setData(pool);
          
          // If metrics failed, create a default metrics object with available data
          if (!met && pool) {
            met = {
              lifetime_blocks: pool.blocks_minted || 0,
              lifetime_roa: null,
              saturation: null,
            };
            console.log("Using default metrics from pool data");
          }
          
          setMetrics(met);
        } else {
          console.warn("Failed to load pool data");
        }
      } catch (error) {
        console.error("Error loading pool data:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading live pool data…</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-2">Unable to load pool data at this time.</p>
        <p className="text-sm text-muted-foreground/70">
          Please check the browser console for details. Make sure VITE_BLOCKFROST_KEY is set in .env.local and the dev server has been restarted.
        </p>
      </div>
    );
  }

  const stat = (label: string, value: any, index: number) => (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-[rgba(27,67,50,0.08)] via-[rgba(10,61,63,0.05)] to-[rgba(236,230,218,0.12)] backdrop-blur-md border border-[rgba(27,67,50,0.15)] shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-2xl font-medium text-primary">
            {value !== undefined ? value : "—"}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  const stats = [
    { label: "Ticker", value: "MLMA" },
    { label: "Live Stake", value: `₳ ${Number(data.live_stake || 0).toLocaleString()}` },
    { label: "Active Stake", value: `₳ ${Number(data.active_stake || 0).toLocaleString()}` },
    { label: "Delegators", value: data.live_delegators || data.delegators || 0 },
    { label: "Blocks Minted", value: metrics?.lifetime_blocks ?? data.blocks_minted ?? 0 },
    { label: "Lifetime ROA", value: metrics?.lifetime_roa ? `${metrics.lifetime_roa}%` : "N/A" },
    { label: "Saturation", value: metrics?.saturation ? `${metrics.saturation}%` : "N/A" },
    { label: "Fixed Fee", value: data.fixed_cost ? `₳${data.fixed_cost / 1000000}` : "₳345" },
    { label: "Margin", value: data.margin ? `${(data.margin / 100).toFixed(1)}%` : "3.5%" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((statItem, index) => stat(statItem.label, statItem.value, index))}
    </div>
  );
}
