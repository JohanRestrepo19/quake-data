export type FeatureRecord = {
  id: string;
  type: string;
  links: {
    external_url: string;
  };
  attributes: {
    external_id: string;
    magnitude: string;
    place: string;
    time: string;
    tsunami: boolean;
    mag_type: string;
    title: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
};

export type ResponseMetadata = {
  record_count: number;
  page_count: number;
};

export type FeaturesResponse = {
  data: FeatureRecord[];
  meta: ResponseMetadata;
  links: {
    first: string;
    prev?: string;
    next?: string;
    last: string;
  };
};

export type Feature = {
  id: string;
  external_url: string;
  external_id: string;
  magnitude: string;
  place: string;
  time: string;
  tsunami: boolean;
  mag_type: string;
  title: string;
  coordinates: {
    longitude: string;
    latitude: string;
  };
};

export type CommentRecord = {
  id: string;
  type: string;
  attributes: {
    body: string;
  };
};

export type Comment = {
  id: string;
  body: string;
};

export type FeatureWithCommentsResponse = {
  data: FeatureRecord
  included: CommentRecord[]
}

export type Features = Feature[];
