import axios from "axios";
import type {
  Comment,
  CommentRecord,
  Feature,
  FeatureRecord,
  FeatureWithCommentsResponse,
  FeaturesResponse,
  ResponseMetadata,
} from "./types";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

export async function fetchFeatures(
  pageNumber: number = 1,
  pageSize: number = 10,
): Promise<{ features: Feature[]; metadata: ResponseMetadata }> {
  const response = await api.get<FeaturesResponse>(
    `/features?page[number]=${pageNumber}&page[size]=${pageSize}`,
  );

  return {
    features: mapFeatureRecords(response.data.data),
    metadata: response.data.meta,
  };
}

export async function fetchFeatureByIdWithComments(
  featureId: string,
): Promise<{ feature: Feature; featureComments: Comment[] }> {
  const response = await api.get<FeatureWithCommentsResponse>(
    `/features/${featureId}?include=comments`,
  );

  console.log("Si que traigo la info: ", response);

  return {
    feature: mapFeatureRecord(response.data.data),
    featureComments: mapCommentsRecords(response.data.included || []),
  };
}

export async function postCommnet(featureId: string, comment: string) {
  return await api.post<CommentRecord>(`/features/${featureId}/comments`, {
    body: comment,
  });
}

// Map functions

function mapCommentRecord(record: CommentRecord): Comment {
  return {
    id: record.id,
    body: record.attributes.body,
  };
}

function mapCommentsRecords(records: CommentRecord[]) {
  return records.map<Comment>((record) => mapCommentRecord(record));
}

function mapFeatureRecord(record: FeatureRecord): Feature {
  return {
    id: record.id,
    external_url: record.links.external_url,
    ...record.attributes,
  };
}

function mapFeatureRecords(records: FeatureRecord[]): Feature[] {
  return records.map<Feature>((record) => mapFeatureRecord(record));
}
