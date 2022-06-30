import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function ViewToken() {
  const router = useRouter();
  const [qrcode, setQRCode] = useState("");

  const tokenIds = router.query.id;
  const tokenId = Number(tokenIds);

  if (isNaN(tokenId)) {
    return (
      <div>Token doesn't exist</div>
    )
  }

  const { loading, data, error } = useQuery(
    gql`
      query GetCoin($id: Int) {
        coin(id: $id) {
          id
          data
        }
      }
    `,
    {
      variables: {
        id: tokenId
      }
    }
  );

  useEffect(() => {
    QRCode.toDataURL(
      location.href,
      {
        type: "image/jpeg",
        errorCorrectionLevel: "H"
      },
      (_, url) => setQRCode(url)
    );
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            PokeCoin Details
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Id</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                # {data.coin.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data.coin.data}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">QR Code</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <img src={qrcode} />
              </dd>
            </div>
            <div className="px-4 py-5">
              <Button onClick={() => router.push("/")}>&lt; Back</Button>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
