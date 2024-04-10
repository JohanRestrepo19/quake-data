require 'httparty'
require 'json'

# @return [Array<Hash{Symbol, String}>]
def fetch_features_data
  # @type [HTTParty::Response]
  raw_response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
  JSON.parse(raw_response.body, { symbolize_names: true })
end

# TODO: I should only expose one task called :set and, create and clear should be functions which work inside that task
namespace :features do
  desc 'Create Feature models'
  task create: :environment do
    puts 'Fetching and creating Feature records...'
    response = fetch_features_data
    # @type [Array]
    features_data = response[:features]

    features_data.each do |feature|
      feature_record = Feature.new(
        {
          external_id: feature[:id],
          magnitude: feature[:properties][:mag],
          time: feature[:properties][:time].to_s,
          tsunami: feature[:properties][:tsunami].zero? ? false : true,
          mag_type: feature[:properties][:magType],
          title: feature[:properties][:title],
          place: feature[:properties][:place],
          longitude: feature[:geometry][:coordinates][0],
          latitude: feature[:geometry][:coordinates][1],
          external_url: feature[:properties][:url]
        }
      )

      feature_record.save if feature_record.valid?
    end

    puts "#{Feature.count} records have been created."
  end

  desc 'Clear features from database'
  task clear: :environment do
    puts 'Deleting all Feature records from database...'
    Feature.destroy_all
  end

  desc 'Set Features data'
  task set: %i[environment clear create] do
  end
end
