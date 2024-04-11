# Resource for Feature model
class FeatureResource < JSONAPI::Resource
  immutable
  has_many :comments

  attributes :external_id, :magnitude, :place, :time, :tsunami, :mag_type, :title

  # TODO: Check if I can filter by more than one value of filter filed.
  filter :mag_type

  exclude_links %i[self related]

  def coordinates
    { longitude: @model.longitude, latitude: @model.latitude }
  end

  def custom_links(_options)
    { external_url: @model.external_url }
  end
end
