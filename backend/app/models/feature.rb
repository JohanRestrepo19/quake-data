# Class Model
class Feature < ApplicationRecord
  validates :title, :place, :mag_type, :latitude, :longitude, :external_url, presence: true

  validates :magnitude, comparison: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude,  comparison: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, comparison: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
end
