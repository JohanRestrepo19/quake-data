import axios from "axios";
import type {
  Feature,
  FeatureRecord,
  FeatureResponse,
  ResponseMetadata,
} from "./types";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

export async function fetchFeatures(
  pageNumber: number = 1,
  pageSize: number = 10,
): Promise<{ features: Feature[]; metada: ResponseMetadata }> {
  const response = await api.get<FeatureResponse>(
    `/features?page[number]=${pageNumber}&page[size]=${pageSize}`,
  );

  console.log("Información de la data: ", response);

  return {
    features: parseFeatureRecords(response.data.data),
    metada: response.data.meta,
  };
}

// Para la obtención de datos tengo que validar que:
// 1. El código de la petición sea postivio -> status code 200 - 299
// 2. Si el codigo no es positivo entonces tengo que mostrar un mensaje de error.
export function parseFeatureRecords(records: FeatureRecord[]): Feature[] {
  return records.map<Feature>((record) => {
    return {
      id: record.id,
      external_url: record.links.external_url,
      ...record.attributes,
    };
  });
}
