import faunaDB from "faunadb";
import configuration from "./configuration";

class FaunaDBServer {
  static client = new faunaDB.Client({
    secret: configuration.faunaSecret,
    domain: "db.eu.fauna.com",
  });
}

export default FaunaDBServer;
