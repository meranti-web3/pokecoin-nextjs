import { gql, ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";

import { getAllCoins, getCoinById, addCoin } from "../business/coins";

const typeDefs = gql`
  type Query {
    coin(id: Int): Coin
    allCoins: [Coin]
  }

  type Coin {
    id: Int!
    data: String
  }

  type Mutation {
    addCoin(data: String): Boolean
  }
`;

const resolvers = {
  Query: {
    coin: (_: any, { id }: { id: number }) => getCoinById(id),
    allCoins: () => getAllCoins()
  },
  Mutation: {
    addCoin: (_: any, { data }: { data: string }) => addCoin(data)
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql"
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false
  }
};
