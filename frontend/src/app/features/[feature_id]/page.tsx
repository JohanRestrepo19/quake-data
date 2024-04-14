import FeaturePanel from "./feature-panel";

type Props = {
  params: {
    feature_id: string;
  };
};

export default function FeaturePage({ params }: Props) {
  return (
    <div>
      <FeaturePanel feature_id={params.feature_id} />
    </div>
  );
}
