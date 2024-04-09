# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

FEATURES_AMOUNT = 4
COMMETS_AMOUNT = 10

FEATURES_AMOUNT.times.each do
  Feature.create!(
    {
      external_id: Faker::Alphanumeric.unique.alphanumeric(number: 10, min_alpha: 2, min_numeric: 3),
      magnitude: Faker::Number.between(from: -1.0, to: 10.0),
      time: Faker::Number.number(digits: 13).to_s,
      tsunami: Faker::Boolean.boolean,
      mag_type: %w[md ml ms mw me mi mb mlg].sample,
      title: Faker::Lorem.sentence,
      place: Faker::Address.street_address,
      longitude: Faker::Address.longitude,
      latitude: Faker::Address.latitude,
      external_url: Faker::Internet.url
    }
  )
end

COMMETS_AMOUNT.times.each do
  Comment.create!(
    {
      body: Faker::Lorem.paragraph,
      feature_id: rand(FEATURES_AMOUNT) + 1
    }
  )
end
