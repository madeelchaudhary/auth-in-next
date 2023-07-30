"use client";
import { Client, Account, ID, Databases } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT!;

const api = {
  sdk: null as { client: Client; account: Account; database: Databases } | null,

  provider() {
    if (api.sdk) {
      return api.sdk;
    }

    const client = new Client();
    console.log("endpoint", endpoint, "project", project);
    client.setEndpoint(endpoint).setProject(project);
    const account = new Account(client);
    const database = new Databases(client);
    api.sdk = { client, account, database };
    return api.sdk;
  },

  createAccount(email: string, password: string, name: string) {
    return api.provider().account.create(ID.unique(), email, password, name);
  },

  login(email: string, password: string) {
    api.provider().account.createVerification;
    return api.provider().account.createEmailSession(email, password);
  },
  getUser() {
    return api.provider().account.get();
  },
  logout() {
    return api.provider().account.deleteSession("current");
  },

  createDocument(data: Record<string, any>) {
    return api
      .provider()
      .database.createDocument("randomm", "random", "unique()", data);
  },

  getDocuments() {
    return api.provider().database.listDocuments("randomm", "random");
  },
};

export default api;
