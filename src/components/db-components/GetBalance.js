import { useBalance } from "wagmi";

export const useGetBalance = (address) => {
  let balance;
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  //   return (
  //     <div>
  //       Balance: {data?.formatted} {data?.symbol}
  //     </div>
  //   );
  if (data) balance = parseFloat(data.formatted);
  return balance.toFixed(2);
};
