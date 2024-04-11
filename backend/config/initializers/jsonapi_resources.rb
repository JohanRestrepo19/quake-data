JSONAPI.configure do |config|
  # Config setting will go here

  config.default_paginator = :paged

  config.default_page_size = 50
  config.maximum_page_size = 1000
end
