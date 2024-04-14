import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getFeatures } from "@/lib/api";

export async function getData() {
  return await getFeatures();
}

export default async function Home() {
  const data = await getData();
  console.log("Información desde la api: ", data);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
