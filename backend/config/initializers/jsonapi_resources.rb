JSONAPI.configure do |config|
  # Config setting will go here

  config.default_paginator = :paged

  config.default_page_size = 50
  config.maximum_page_size = 1000

  # :underscored_key, :camelized_key, :dasherized_key, or custom
  config.json_key_format = :underscored_key

  # :underscored_route, :camelized_route, :dasherized_route, or custom
  config.route_format = :underscored_route

  config.top_level_meta_include_record_count = true
  config.top_level_meta_record_count_key = :record_count

  config.top_level_meta_include_page_count = true
  config.top_level_meta_page_count_key = :page_count
end
