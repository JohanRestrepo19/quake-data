require 'httparty'
require 'json'

# @return [Array<Hash{Symbol, String}>]
def fetch_features_data
  # @type [HTTParty::Response]
  raw_response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
  JSON.parse(raw_response.body, { symbolize_names: true })
end

namespace :features do
  desc 'Sync Features data'
  task sync: :environment do
    puts 'Syncing features data...'
    response = fetch_features_data
    # @type [Array]
    features_data = response[:features]
    new_records_amount = 0

    features_data.each do |raw_feature|
      # @type [Feature]
      feature = Feature.find_or_initialize_by(external_id: raw_feature[:id]) do |f|
        f.magnitude = raw_feature[:properties][:mag]
        f.time = raw_feature[:properties][:time].to_s
        f.tsunami = raw_feature[:properties][:tsunami].zero? ? false : true
        f.mag_type = raw_feature[:properties][:magType]
        f.title = raw_feature[:properties][:title]
        f.place = raw_feature[:properties][:place]
        f.longitude = raw_feature[:geometry][:coordinates][0]
        f.latitude = raw_feature[:geometry][:coordinates][1]
        f.external_url = raw_feature[:properties][:url]
      end

      if feature.new_record? && feature.valid?
        feature.save
        new_records_amount += 1
      end
    end

    puts "#{new_records_amount} records have been created."
  end
end
