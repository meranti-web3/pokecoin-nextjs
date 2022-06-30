import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

export default function ViewCoins() {
  const { loading, data } = useQuery(
    gql`
      {
        allCoins {
          id
          data
        }
      }
    `,
    {
      fetchPolicy: "network-only"
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <table className="border-collapse border-slate-500 rounded-md text-sm font-medium text-white">
        <thead className="bg-gray-900">
          <tr>
            <th className="border border-slate-600 p-3">Id</th>
            <th className="border border-slate-600 p-3">data</th>
            <th className="border border-slate-600 p-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.allCoins
            .map(({ id, data: coinData }: any) => (
              <tr key={id}>
                <td className="border border-slate-600 p-3 text-gray-700">
                  {id}
                </td>
                <td className="border border-slate-600 p-3 text-gray-700">
                  {coinData}
                </td>
                <td className="border border-slate-600 p-3 text-gray-700">
                  <Link
                    className="text-blue-600 underline hover:text-blue-900"
                    href={`/token/${id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </div>
  );
}
