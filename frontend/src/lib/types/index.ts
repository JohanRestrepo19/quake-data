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

export type FeatureResponse = {
  data: FeatureRecord[];
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

export type Features = Feature[];
