const BLOCKFROST_KEY = import.meta.env.VITE_BLOCKFROST_KEY || import.meta.env.NEXT_PUBLIC_BLOCKFROST_KEY;

const getHeaders = () => {
  const key = BLOCKFROST_KEY;
  if (!key) {
    console.warn("Blockfrost API key not found. Please set VITE_BLOCKFROST_KEY in .env.local");
    return {};
  }
  return {
    'project_id': key,
    'Content-Type': 'application/json',
  };
};

export async function getPoolData(poolId: string) {
  try {
    const headers = getHeaders();
    if (!headers.project_id) {
      throw new Error("API key not configured");
    }

    const res = await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/pools/${poolId}`,
      { 
        headers,
        method: 'GET',
      }
    );
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Blockfrost API error (${res.status}):`, errorText);
      throw new Error(`API error: ${res.status} - ${errorText}`);
    }
    
    return await res.json();
  } catch (err) {
    console.error("BLOCKFROST POOL DATA ERROR:", err);
    return null;
  }
}

export async function getPoolMetrics(poolId: string) {
  try {
    const headers = getHeaders();
    if (!headers.project_id) {
      throw new Error("API key not configured");
    }

    const res = await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/pools/${poolId}/metrics`,
      { 
        headers,
        method: 'GET',
      }
    );
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Blockfrost API error (${res.status}):`, errorText);
      throw new Error(`API error: ${res.status} - ${errorText}`);
    }
    
    return await res.json();
  } catch (err) {
    console.error("BLOCKFROST METRICS ERROR:", err);
    return null;
  }
}

