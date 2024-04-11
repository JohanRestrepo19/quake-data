# Base ApplicationController
class ApplicationController < ActionController::API
  include JSONAPI::ActsAsResourceController
end
